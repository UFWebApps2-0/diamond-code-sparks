import React, {useState} from 'react';
import {Modal,Button,Table} from 'antd';

function StudentAssessmenmts()
{
    const [visible,setVisible]=useState(false);
    const showModal=()=>{
        setVisible(true);
    };
    let data=[];
    const columns=[
        {
            title: 'Assessment Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            sorter: {
              compare: (a, b) => (a.name < b.name ? -1 : 1),
            },
          },
          {
            title: 'View Assessments',
            dataIndex: 'assessments',
            keyIndex: 'assessments',  
            width: '30%',
            render: () => (
              <StudentAssessmenmts/>
            ),
            
          },
          {
            title:'Grade',
            dataIndex:'grade',
            keyIndex:'grade',
            editable:true, 
            width:'20%'
          }
    ]
    return (
        <div>
            <button onClick={showModal}>View</button>
            <Modal visible={visible} 
                onCancel={()=>setVisible(false)} 
                footer={[<Button key='ok' type='primary' onClick={()=>setVisible(false)}>OK</Button>]}>
                
                <Table columns={columns} dataSource={data} />

            </Modal>
        </div>
    );
}

export default StudentAssessmenmts;