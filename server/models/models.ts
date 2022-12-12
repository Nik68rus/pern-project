import sequelize from '../db';
import {
  DataTypes,
  Model,
  Optional,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
  NonAttribute,
} from 'sequelize';
import { UserRole } from '../types';

interface User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: CreationOptional<number>;
  email: string;
  password: string;
  role: UserRole;
  // createdAt: CreationOptional<Date>;
  // updatedAt: CreationOptional<Date>;
}

const User = sequelize.define<User>('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
  // createdAt: {
  //   type: DataTypes.DATE,
  // },
  // updatedAt: {
  //   type: DataTypes.DATE,
  // },
});

interface Cart
  extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
  id: CreationOptional<number>;
  userId: CreationOptional<number>;
  // createdAt: CreationOptional<Date>;
  // updatedAt: CreationOptional<Date>;
}

const Cart = sequelize.define<Cart>('cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: DataTypes.INTEGER,
  // createdAt: DataTypes.DATE,
  // updatedAt: DataTypes.DATE,
});

interface CartDevice
  extends Model<
    InferAttributes<CartDevice>,
    InferCreationAttributes<CartDevice>
  > {
  id: CreationOptional<number>;
  cartId: CreationOptional<number>;
  deviceId: CreationOptional<number>;
}

const CartDevice = sequelize.define<CartDevice>('cart_device', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cartId: DataTypes.INTEGER,
  deviceId: DataTypes.INTEGER,
});

interface Device
  extends Model<InferAttributes<Device>, InferCreationAttributes<Device>> {
  id: CreationOptional<number>;
  name: string;
  price: number;
  rating?: number;
  img: string;
  typeId: CreationOptional<number>;
  brandId: CreationOptional<number>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

const Device = sequelize.define<Device>('device', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeId: DataTypes.INTEGER,
  brandId: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

interface Type
  extends Model<InferAttributes<Type>, InferCreationAttributes<Type>> {
  id: CreationOptional<number>;
  name: string;
}

const Type = sequelize.define<Type>('type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

interface Brand
  extends Model<InferAttributes<Brand>, InferCreationAttributes<Brand>> {
  id: CreationOptional<number>;
  name: string;
}

const Brand = sequelize.define<Brand>('brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

interface TypeBrand
  extends Model<
    InferAttributes<TypeBrand>,
    InferCreationAttributes<TypeBrand>
  > {
  id: CreationOptional<number>;
}

const TypeBrand = sequelize.define<TypeBrand>('type_brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

interface DeviceInfo
  extends Model<
    InferAttributes<DeviceInfo>,
    InferCreationAttributes<DeviceInfo>
  > {
  id: CreationOptional<number>;
  title: string;
  description: string;
  deviceId: CreationOptional<number>;
}

const DeviceInfo = sequelize.define<DeviceInfo>('device_info', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deviceId: DataTypes.INTEGER,
});

interface Rating
  extends Model<InferAttributes<Rating>, InferCreationAttributes<Rating>> {
  id: CreationOptional<number>;
  rate: number;
  deviceId: CreationOptional<number>;
  userId: CreationOptional<number>;
}

const Rating = sequelize.define<Rating>('rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deviceId: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Device.hasMany(Rating);
Rating.belongsTo(Device);
Rating.hasOne(Device);

Cart.hasMany(CartDevice);
CartDevice.belongsTo(Cart);

CartDevice.hasOne(Device);
Device.belongsToMany(Cart, { through: CartDevice });

Brand.hasMany(Device);
Device.belongsTo(Brand);

Type.hasMany(Device);
Device.belongsTo(Type);

Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export {
  User,
  Cart,
  CartDevice,
  Device,
  Type,
  Brand,
  Rating,
  TypeBrand,
  DeviceInfo,
};
