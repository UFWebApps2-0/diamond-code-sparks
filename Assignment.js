import { Assignment } from "./AssignmentModel";


class Assignment {
    // create assignment
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    // put in database (seperate)
    pushChanges() {
        // put info into JSON
        // put JSON in database OR update database with new info
    }


    // pull from database (overwrites local data)
    pullChanges() {
        // 
    }

    // delete from database
    delete() {
        //
    }

    // modify from database
    modify(name=null, description=null) {
        // change local info
        if (name) {
            this.name = name;
        }
        if (description) {
            this.description = description;
        }
    }
};

