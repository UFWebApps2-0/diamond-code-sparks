import React, { useState } from 'react';
import { Button, Modal, Select } from 'antd';
const SelectPerson = ({ onChange }) => (
  <Select
    showSearch
    placeholder="Select a student"
    onChange={onChange}
    options={[
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
      {
        value: 'tom',
        label: 'Tom',
      },
    ]}
    size = "large"
  />
);
const ShareButton = ({ onOpen }) => (
  <>
    <Button type="primary" onClick={onOpen} size = "large">
      Share
    </Button>
  </>
);
const RemoveShareButton = ({ onOpen }) => (
  <>
    <Button type="primary" onClick={onOpen} size="large">
      Remove Share
    </Button>
  </>
);
const ShareProgram = () => {
    const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRemoveShareModalOpen, setIsRemoveShareModalOpen] = useState(false);
  const [listOfPrograms, setListOfPrograms] = useState(['Program 1', 'Program 2', 'Program 3']);
  const showModal = (modalType) => {
    if (modalType === 'share') {
      setIsShareModalOpen(true);
    } else if (modalType === 'removeShare') {
      setIsRemoveShareModalOpen(true);
    }
  };
  const handleOk = (modalType) => {
    if (modalType === 'share') {
      setIsShareModalOpen(false);
    } else if (modalType === 'removeShare') {
      setIsRemoveShareModalOpen(false);
    }
    //if ok pressed do something
  };
  const handleCancel = (modalType) => {
    if (modalType === 'share') {
      setIsShareModalOpen(false);
    } else if (modalType === 'removeShare') {
      setIsRemoveShareModalOpen(false);
    }
  };
  const selectProgram = (modalType) => {
    if (modalType === 'share') {
      setIsShareModalOpen(false);
    } else if (modalType === 'removeShare') {
      setIsRemoveShareModalOpen(false);
    }
  };
  return (
    <div>
        <div>
            <h2>Select a Program to Share:</h2>
        </div>
        <div>
        <>
        `   <Button type="default" onClick={() => setSelectedProgram(listOfPrograms[0])}>
                {listOfPrograms[0]}
            </Button>
        </>
        <>
        `   <Button type="default" onClick={() => setSelectedProgram(listOfPrograms[1])}>
                {listOfPrograms[1]}
            </Button>
        </>
        <>
        `   <Button type="default" onClick={() => setSelectedProgram(listOfPrograms[2])}>
                {listOfPrograms[2]}
            </Button>
        </>
        </div>
        <div>
            <h1> </h1>
            <h1> </h1>
            <h2>Select a Student to Change {selectedProgram} Sharing Access:</h2>
        </div>
        <div>
        <SelectPerson onChange={(value) => setSelectedPerson(value)} />
        <ShareButton onOpen={() => showModal('share')} />
        <Modal
            title="Confirm Share Access"
            open={isShareModalOpen}
            onOk={() => handleOk('share')}
            onCancel={() => handleCancel('share')}
        >
            <p>Are you sure you wish to continue?</p>
        </Modal>
        <RemoveShareButton onOpen={() => showModal('removeShare')} />
        <Modal
            title="Confirm Removal of Share Access"
            open={isRemoveShareModalOpen}
            onOk={() => handleOk('removeShare')}
            onCancel={() => handleCancel('removeShare')}
        >
            <p>Are you sure you wish to continue?</p>
        </Modal>
        </div>
      
    </div>
  );
};
export default ShareProgram;