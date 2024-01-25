import { Button, Form, Input, message, Modal } from "antd"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  getLessonModule,
  updateLessonModule,
} from "../../../Utils/requests"
import ActivityEditor from "../ActivityEditor/ActivityEditor"
export default function FeedbackSection({
  learningStandard,
  viewing,
  setViewing,
  tab,
  page,
}) {
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState(learningStandard.name)
  const [description, setDescription] = useState("")
  const [standards, setStandards] = useState("")
  const [link, setLink] = useState("")
  const [linkError, setLinkError] = useState(false)
  const [displayName, setDisplayName] = useState(learningStandard.name)
  // eslint-disable-next-line
  const [_, setSearchParams] = useSearchParams()
  const showModal = async () => {
    setVisible(true)
    const res = await getLessonModule(learningStandard.id)
    setName(res.data.name)
    setDescription(res.data.expectations)
    setStandards(res.data.standards)
    setLink(res.data.link)
    setLinkError(false)
  }
  useEffect(() => {
    setDisplayName(learningStandard.name)
  }, [learningStandard.name])
  const handleCancel = () => {
    setVisible(false)
  }
  const handleSubmit = async () => {
    if (link) {
      const goodLink = checkURL(link)
      if (!goodLink) {
        setLinkError(true)
        message.error("Please Enter a valid URL starting with HTTP/HTTPS", 4)
        return
      }
    }
    const response = await updateLessonModule(
      learningStandard.id,
      name,
      description,
      standards,
      link
    )
    if (response.err) {
      message.error("Fail to update lesson")
    } else {
      message.success("Update lesson success")
      setDisplayName(name)
      setSearchParams({ tab, page, activity: response.data.id })
      setViewing(response.data.id)
      setVisible(false)
    }
  }
  const checkURL = n => {
    const regex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g
    if (n.search(regex) === -1) {
      return null
    }
    return n
  }
  return (
    <div>
      <button id="link-btn" onClick={showModal}>
        Comment
      </button>
      <Modal
        title="Students' Feedback"
        open={visible}
        width="35vw"
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          id="add-units"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          onFinish={handleSubmit}
          layout="horizontal"
          size="default"
        >
          <Form.Item id="form-label" label="Student 1">
            <Input
              value= "Need help with concept 1"
            />
          </Form.Item>
          <Form.Item id="form-label" label="Student 2">
            <Input
              value= "Need help with concept 2"
            />
          </Form.Item>
          <Form.Item id="form-label" label="Student 3">
            <Input
              value= "Need help with concept 3"
            />
          </Form.Item>
        </Form>
      </Modal>
      {!visible ? (
        <ActivityEditor
          learningStandard={learningStandard}
          viewing={viewing}
          setViewing={setViewing}
          page={page}
          tab={tab}
        />
      ) : null}
    </div>
  )
}