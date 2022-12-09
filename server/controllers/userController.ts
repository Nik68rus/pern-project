import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isEmail } from '../helpers/validation';
import { Cart, User } from '../models/models';
import { handleError } from '../helpers/controllers';
import { ExtendedRequest, UserRole } from '../types';

interface SignupRequest extends Request {
  body: {
    email: string;
    password: string;
    role?: UserRole;
  };
}

const generateJWT = (id: number, email: string, role: string) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET as string, {
    expiresIn: '24h',
  });
};

class UserController {
  async signup(req: SignupRequest, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;

      if (!isEmail(email) || !password || password.trim().length < 3) {
        return next(ApiError.validation('Неверные данные в полях ввода!'));
      }

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return next(ApiError.badRequest('Пользователь уже существует!'));
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        email,
        password: hashedPassword,
        role: role || 'USER',
      });

      const cart = await Cart.create({ userId: user.id });

      const token = generateJWT(user.id, email, user.role);

      res.status(201).json({ message: 'User registered', payload: token });
    } catch (err) {
      handleError(err, next);
    }
  }

  async login(req: SignupRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.notFound('Пользователь не найден!'));
      }

      const isEqual = await bcrypt.compare(password, user.password);

      if (!isEqual) {
        return next(ApiError.forbiden('Неправильный пароль!'));
      }

      const token = generateJWT(user.id, user.email, user.role);

      return res.status(200).json({ message: 'Logged in!', payload: token });
    } catch (error) {
      handleError(error, next);
    }
  }

  async check(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { user } = req;
    if (!user) {
      return next(ApiError.forbiden('Не достаточно прав доступа!'));
    }
    const token = generateJWT(user.id, user.email, user.role);
    res.status(200).json({ message: 'ok', payload: token });
  }
}

export default new UserController();
