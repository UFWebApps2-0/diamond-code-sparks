import { React, useEffect, useState } from "react";
import { Collapse, InputNumber } from "antd";
const { Panel } = Collapse;


// https://ant.design/components/collapse
// https://ant.design/components/collapse#components-collapse-demo-extra
// https://ant.design/components/collapse#components-collapse-demo-size
// https://ant.design/components/collapse#components-collapse-demo-custom

// https://dev.to/shareef/how-to-work-with-arrays-in-reactjs-usestate-4cmi 

export default function GroupView(props) {
    const {
        studentData,
        filterText,
    } = props;

    // Expect format of incoming information from Strapi backend
    // groupFormat = [
    //     {
    //         id: 0,
    //         students: [],
    //     },
    // ];

    // Move this to roster.jsx for future work in gathering groupData from backend
    const [groupSize, setGroupSize] = useState(3);
    const [groupData, setGroupData] = useState([]);

    // Store a copy of groupData 
    var groupTemp = groupData;

    function filterGroups(data) {
        if (data.students === undefined) {
            return false;
        }

        const res = data.students.filter((student) =>
            student.name.toLowerCase().includes(filterText.toLowerCase()));

        if (res === undefined || res.length == 0) {
            return false;
        }

        return true;
    }

    //  Search onto the search filter text to reduce number of groups shown
    useEffect(() => {
        if (filterText != "") {
            let data = [];
            data = groupData.filter(filterGroups);
            setGroupData(data);
        } else {
            setGroupData(groupTemp);
        }
    }, [filterText]);

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

        // After randomizing students, group into respective sizes
        let groups = [];
        let i = 0;
        while (dataSource.length > 0) {
            let temp = dataSource.splice(0, groupSize);
            groups.push({ id: ++i, students: temp });
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

    // Empty group array
    if (groupData.length == 0) {
        return (
            <div>
                <div>
                    <button onClick={() => handleClick()}>
                        Randomize Groups
                    </button>
                    <InputNumber min={1} max={10} defaultValue={groupSize} onChange={onChange} />
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
            <InputNumber min={1} max={10} defaultValue={groupSize} onChange={onChange} />

            <div id="card-container">
                <Collapse className="centerCollapse">
                    {/* Goes through each group */}
                    {groupData.map((group) => (
                        // Group id should never be 0 as that is the default value
                        group.id != 0 ? (<Panel header={"Group: " + group.id} key={group.id} >
                            {
                                // Goes through each student in a group
                                group.students.map((person, index) => (
                                    <p id="center-text" key={index + 1} >
                                        {(index + 1) + ". " + person.name}
                                    </p>
                                ))
                            }
                        </Panel>) : null
                    ))}
                </Collapse>
            </div>
        </div >
    );
}
