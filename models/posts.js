const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        image: {
            type: DataTypes.STRING,
            allowNull: false

        },
        profile_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'profile',
                key: 'id',
            },
        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
)

module.exports = Posts;