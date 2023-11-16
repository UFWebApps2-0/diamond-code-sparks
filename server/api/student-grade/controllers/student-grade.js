'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */



module.exports = {
    async findByClassroom(ctx) {
        const { classroomID } = ctx.params;
    
        // Query student grades where the 'classroom' field in the 'submission' object matches the classroomID
        const studentGrades = await strapi.services['student-grade'].find({
          'submission.classroom': classroomID
        });
    
        return studentGrades;
      }
};
