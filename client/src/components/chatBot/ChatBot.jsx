import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import toast from 'react-hot-toast';
import axios from 'axios';

const ChatBot = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "hi, how can i help you"
    }
  ]);
  const [text, setText] = useState('');

  const onSend = async () => {
    if (!text) {
      toast.error('Something Went Wrong');
    } else {
      try {
        setLoading(true); // Set loading to true while fetching data
        const { data } = await axios.post('/api/v1/openai/get-reply', { text });

        let list = [...messages, { message: text, user: true }];
        list = [...list, { message: data }];
        setMessages(list);
        setText("");
        setTimeout(() => {
          document.querySelector('#btn').scrollIntoView();
        });
      } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong');
      } finally {
        setLoading(false); // Set loading back to false after fetching data
      }
    }
  };

  return (
    <div>
      <div className='d-flex align-items-center justify-content-center'>
        <img
          src="https://img.freepik.com/premium-vector/chatbot-icon-concept-chat-bot-chatterbot-robot-virtual-assistance-website_123447-1615.jpg?w=2000"
          alt="logo"
          height={200}
          width={200}
        />
      </div>
      <div className='chat-message'>
        {
          messages.length > 0 && messages.map((data, index) => <div key={index}><ChatMessage {...data} /></div>)
        }
        <div className='d-flex mt-2'>
          <input type="text" className='form-control' value={text} onChange={(e) => (setText(e.target.value))} />
          <button id='btn' type="button" className="ms-2 btn btn-primary" onClick={onSend} disabled={loading}>
            {loading ? 'Loading...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
