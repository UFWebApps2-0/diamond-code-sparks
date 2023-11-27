import { React, useEffect, useState } from "react";
import { Collapse, InputNumber } from "antd";
const { Panel } = Collapse;


// https://ant.design/components/collapse
// https://ant.design/components/collapse#components-collapse-demo-extra
// https://ant.design/components/collapse#components-collapse-demo-size
// https://ant.design/components/collapse#components-collapse-demo-custom

export default function GroupView(props) {
    const {
        studentData,
        filterText,
    } = props;

    const [groupSize, setGroupSize] = useState(3);

    // Move this to roster.jsx for future work in gathering groupData from backend
    const [groupData, setGroupData] = useState([]);

    // Add a search onto the search filter text to reduce number of groups shown
    // useEffect(() => {
    //     const filterRoster = classroom.students.filter((student) => student.name.toLowerCase().includes(filterText.toLowerCase()));
    //     filterRoster.forEach((student) => {
    //         data.push({
    //             key: student.id,
    //             name: student.name,
    //             character: student.character,
    //             enrolled: {
    //                 id: student.id,
    //                 enrolled: student.enrolled,
    //             },
    //             last_logged_in: student.last_logged_in,
    //         });
    //     });
    //     setStudentData(data);
    // } else {
    //     message.error(res.err);
    // }
    //     , filterText)



    // Handles randomization of students into groups of size groupSize. Returns array of groups
    const randomizeGroups = () => {
        const dataSource = [...studentData];

        // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
        for (let i = dataSource.length; i > 0; i--) {
            /* The Math.random() static method returns a floating-point,
             pseudo - random number that's greater than or equal to 0 and 
             less than 1, with approximately uniform distribution over that
             range — which you can then scale to your desired range.The 
             implementation selects the initial seed to the random number 
             generation algorithm; it cannot be chosen or reset by the user. */
            let j = Math.floor(Math.random() * (i));

            // Swap elements
            let temp = dataSource[j];
            dataSource[j] = dataSource[i - 1];
            dataSource[i - 1] = temp;
        }

        // Group students
        // Hard coded groups of 3. Will be changed to allow teacher to specify
        let groups = [];

        while (dataSource.length > 0) {
            groups.push(dataSource.splice(0, groupSize))
        }

        // Return groups
        setGroupData(groups);
    };

    const handleClick = () => {
        randomizeGroups();
    };

    const onChange = (value) => {
        setGroupSize(value);
    };

    // Empty
    if (groupData.length == 0) {
        return (
            <div>
                <div>
                    <button onClick={() => handleClick()}>
                        Randomize Groups
                    </button>
                    <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />

                    <div id="card-container">
                        <p id="center-text">No Groups Available</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => handleClick()}>
                Randomize Groups
            </button>
            <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />

            <div id="card-container">
                <Collapse className="centerCollapse">
                    {groupData.map((group, index) => (
                        <Panel header={"Group: " + (index + 1)} key={(index + 1)} >
                            {group.map((person, i) => (
                                <text id="center-text">{(i + 1) + ". " + person.name}</text>
                            ))}
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </div >
    );
}