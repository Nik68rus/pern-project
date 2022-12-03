import sequelize from '../db';
import {
  DataTypes,
  Model,
  Optional,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from 'sequelize';

const User = sequelize.define('user', {
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
});

const Cart = sequelize.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const CartDevice = sequelize.define('cart_device', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const Device = sequelize.define('device', {
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
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Type = sequelize.define('type', {
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

const Brand = sequelize.define('brand', {
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

const TypeBrand = sequelize.define('type_brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const DeviceInfo = sequelize.define('device_info', {
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
});

const Rating = sequelize.define('rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Cart.hasMany(CartDevice);
CartDevice.belongsTo(Cart);

Brand.hasMany(Device, { foreignKey: 'id' });
Device.belongsTo(Brand, { foreignKey: 'id' });

Type.hasMany(Device);
Device.belongsTo(Type);

Device.hasMany(DeviceInfo);
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
