import { Button, Form, Input, message, Modal } from "antd"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getDiscussion,
  getActivityToolbox,
  getActivityToolboxAll,
  getLessonModuleDiscussions,
  updateDiscussionDetails,
} from "../../../../Utils/requests"
import "../../../ContentCreator/DiscussionEditor/DiscussionEditor.less"

const SCIENCE = 1
const MAKING = 2
const COMPUTATION = 3

const MentorDiscussionDetailModal = ({
  learningStandard,
  selectDiscussion,
  setDiscussions,
  open,
  viewing,
}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  // const [images, setImages] = useState("")
  const [visible, setVisible] = useState(false);
  // const [activityDetailsVisible, setActivityDetailsVisible] = useState(false)
  const [submitButton, setSubmitButton] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    console.log("effect used")
    const showActivityDetailsModal = async () => {
      const response = await getDiscussion(selectDiscussion.id)
      if (response.err) {
        message.error(response.err)
        return
      }
      setTitle(response.data.Title)
      setDescription(response.data.Description)
      // setImages(response.data.images)
    }
    showActivityDetailsModal()
  }, [selectDiscussion])

  const handleSave = async () => {
    const res = await updateDiscussionDetails(
      selectDiscussion.id,
      title,
      description,
    )
    if (res.err) {
      message.error(res.err)
    } else {
      message.success("Successfully saved discussion")
      // just save the form
      if (submitButton === 0) {
        console.log(viewing)
        const getDiscussionAll = await getLessonModuleDiscussions(viewing)
        const myDiscussions = getDiscussionAll.data
        myDiscussions.sort((a, b) => (a.number > b.number ? 1 : -1))
        setDiscussions([...myDiscussions])
      } 
    }
  }
  const showModal = () => {
    setVisible(true)
    //setOpen(true)
};
  return (
    <div id="mentoredit">
      {/* <Button id="view-discussion-button" */}
    <Button id="view-discussion-button"
    onClick={showModal} style={{width: '40px',marginRight: "auto"}} >
<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
>
<g
            id="link"
            stroke="none"
            fill="none"
          >
            </g>
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
      </Button>
    <Modal
      title={`${learningStandard.name} - ${selectDiscussion.Title}`}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      width="45vw"
    >
      <Form
        id="discussion-detail-editor"
        layout="horizontal"
        size="default"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={handleSave}
      >
        <Form.Item id="form-label" label="Title">
          <Input.TextArea
            onChange={e => setTitle(e.target.value)}
            value={title}
            required
            placeholder="Enter title"
          ></Input.TextArea>
        </Form.Item>
        
        <Form.Item id="form-label" label="Description">
          <Input.TextArea
            onChange={e => setDescription(e.target.value)}
            value={description}
            required
            placeholder="Enter description"
          ></Input.TextArea>
        </Form.Item>
        
        {/* <Form.Item id="form-label" label="Table Chart">
          <Input.TextArea
            onChange={e => setImages(e.target.value)}
            value={images}
            className="input"
            placeholder="Enter image URL"
          ></Input.TextArea>
        </Form.Item> */}   
        
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          style={{ marginBottom: "0px" }}
        >
          <Button
            onClick={() => setSubmitButton(0)}
            type="primary"
            htmlType="submit"
            size="large"
            className="content-creator-button"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    </div>
  )
}

export default MentorDiscussionDetailModal