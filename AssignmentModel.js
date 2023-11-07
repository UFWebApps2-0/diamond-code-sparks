/* Import Sequalize and other libraires */
//Syntax for importing ES Modules - https://www.geeksforgeeks.org/how-to-use-an-es6-import-in-node-js/
import { Sequelize, Model, DataTypes } from '@sequelize/core';

  //imports dontenv module and allows us to access stored environment variables stored in .env file
  import 'dotenv/config';

//ADD CODE HERE to connect to you database
const sequelize = new Sequelize(process.env.API_URL);

/* Create your Sequalize Model for Assignment */
/*Hint: Take a look at Assignments.json to figure out the model attributes we need to define.
  We are creating this model to define the format of our table.
  Read up on how to define a model using sequelize.define - https://sequelize.org/docs/v6/core-concepts/model-basics/
  Also Check out - //Data Types - https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
*/
const Assignment = sequelize.define('Assignment', {
  // Model attributes are defined here
    kind: "collectionType",
    collectionName: "lesson_modules",
    info: {
      name: DataTypes.string,
      description: DataTypes.string,
      allowNull: false
    },
    options: {
      increments: true,
      timestamps: true,
      draftAndPublish: false
    },
    attributes: {
      number: {
        type: DataTypes.string,
        required: true
      },
      name: {
        type: DataTypes.string,
        required: true
      },
      expectations: {
        type: DataTypes.string
      },
      activities: {
        via: DataTypes.string,
        collection: DataTypes.string
      },
      unit: {
        model: DataTypes.string,
        via: DataTypes.string
      },
      standards: {
        type: DataTypes.string,
        unique: true
      },
      link: {
        type: DataTypes.string
      }
    }
}, {
  // Other model options go here
  tableName: 'Assignments'
});

// `sequelize.define` also returns the model
console.log(Assignment === sequelize.models.Assignment); // true
console.log(Assignment);

/* Export the model to make it avaiable to other parts of your Node application */
//Read article "ES6 Modules and How to Use Import and Export in JavaScript" https://www.digitalocean.com/community/tutorials/js-modules-es6
//Export the model 'Assignment' in a single statement at the end of the module
export { Assignment };
