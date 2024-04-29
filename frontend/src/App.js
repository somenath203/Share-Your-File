import axios from 'axios';
import { useState } from 'react';
import { Upload, Form } from 'antd';
import {
  InboxOutlined,
  GithubOutlined,
  CopyOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import { message } from 'antd';

const App = () => {

  const { Dragger } = Upload;

  const [acceptFileInput, setAcceptFileInput] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [generatedURL, setGeneratedURL] = useState();

  const [loading, setLoading] = useState();

  const [form] = Form.useForm();


  const isShowModalOpen = () => {
    setIsModalOpen(true);
  };

  const isShowModalClose = () => {
    setIsModalOpen(false);
  };

  const isShowModalCancel = () => {
    setIsModalOpen(false);
  };


  const sendImageToBackend = async () => {
    try {

      const formData = new FormData();

      formData.append('nameofthefile', acceptFileInput.name);
      formData.append('file', acceptFileInput);

      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_NODEJS_URL}/upload-file-and-create-url`,
        formData
      );

      setGeneratedURL(data?.path);

      setLoading(false);

      message.success('Your sharalable url has been generated successfully.');

      isShowModalOpen();

      setAcceptFileInput('');

      form.resetFields();

    } catch (error) {

      isShowModalClose();

      message.error('Something went wrong or no file was uploded!! Please try after sometime.', 4);

      setLoading(false);

      console.log(error);
    }
  };


  const copyLinkToClipboard = () => {

    navigator.clipboard.writeText(generatedURL);

    message.success('link copied to clipboard successfully');

  }

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-3 items-center px-10 p-6">

        <div className="text-xl lg:text-2xl tracking-widest font-bold text-green-500">
          ShareYourFile
        </div>

        <div className="text-3xl text-green-400">
          <GithubOutlined />
        </div>

      </div>

      <div className="bg-slate-50 min-h-screen mt-4">

        <div className="text-center pt-20 px-4">

          <p className="text-green-500 font-semibold text-lg lg:text-xl tracking-wide">
            Share your favourite files with anyone for absolutely free
          </p>

        </div>

        <div className="m-auto mt-10 w-11/12 lg:w-3/5">

          <Form form={form} onFinish={sendImageToBackend}>

            <Form.Item name="file">
              <Dragger
                name="file"
                onChange={(e) =>
                  setAcceptFileInput(e.fileList[0].originFileObj)
                }
                beforeUpload={() => false}
                showUploadList={{ showRemoveIcon: false }}
              >
                <div className="ant-upload-drag-icon text-green-500 text-6xl">
                  <InboxOutlined />
                </div>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">Support for single upload.</p>
              </Dragger>
            </Form.Item>

            <Form.Item className="w-full">
              {loading ? (
                <div className='w-full flex items-center justify-center'>
                  <LoadingOutlined className='text-3xl font-bold' />
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-green-200 py-3 rounded-lg text-lg tracking-wider uppercase text-green-700 hover:bg-green-300 transition-all duration-150"
                >
                  Submit
                </button>
              )}
            </Form.Item>

          </Form>

        </div>

        <div className="text-center mt-14 px-4 lg:px-8">
          <span className="text-green-400 font-semibold text-lg lg:text-xl tracking-wider">
            ShareYourFile is an Open Source Tool to share file with anyone.
            ShareYourFile is created with the help of ReactJS, antd, TailwindCSS
            and ExpressJS.
          </span>
        </div>
        
      </div>

      <Modal
        open={isModalOpen}
        onOk={isShowModalClose}
        onCancel={isShowModalCancel}
        centered
        okButtonProps={{
          className: 'bg-green-500 hover:bg-green-600 text-white',
        }}
        cancelButtonProps={{
          className: 'border border-green-600 hover:border-green-700',
        }}
      >
        <div className="flex justify-center items-center flex-col gap-4">
          <p className="text-xl text-green-500 tracking-wide font-semibold text-center">
            Sharable URL of the Uploaded File
          </p>
          <a href={generatedURL}>
            <p className="text-base text-green-600 text-center font-semibold">
              Click the icon below to copy the Sharable URL in your clipboard.
            </p>
          </a>
          <p>
            <CopyOutlined className="text-xl text-green-600" onClick={copyLinkToClipboard} />
          </p>
        </div>
      </Modal>
    </>
  );
};

export default App;
