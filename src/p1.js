import React, { useState,useEffect,useRef } from "react";
import { Upload, Button, message, Row, Typography} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
const { Text } = Typography;

const P1 = () => {


  const [loading, setLoading] = useState(false);
  const [textareaContent, setTextareaContent] = useState("");
  const [textareaContent2, setTextareaContent2] = useState("");
  const [displayedSentences, setDisplayedSentences] = useState([]);
  const [counter, setCounter] = useState(0);
  const [paragraph, setParagraph] = useState("");
  const scrollRef = useRef(null);
  const buttonRef_next = useRef(null);
  const buttonRef_before = useRef(null);
  const sentences = paragraph.split(/(?<=[。，\s])/);

  const handleTextareaChange = (e) => {
    setTextareaContent(e.target.value); 
  };

  const handleButtonClick_displayall = () => {
    console.log("Textarea content:", textareaContent);
    message.success("success!");
    setParagraph(textareaContent);
  };

  const handleButtonClick_next = () => {
    if (counter < sentences.length) {
      const newDisplayedSentences = [...displayedSentences, sentences[counter]];
      setDisplayedSentences(newDisplayedSentences);
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  const handleButtonClick_before = () => {
    if (counter > 0) {
      setCounter((prevCounter) => prevCounter - 1);
      setDisplayedSentences(displayedSentences.slice(0, counter - 1));
    }
  };

  const clearBtn = () => {
    setDisplayedSentences([]);
    setCounter(0);
    setParagraph("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      // 滚动到最底部
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [displayedSentences]);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      console.log('Right arrow key pressed!');
    //   handleButtonClick_next();
      buttonRef_next.current.click();
    }
    else if (event.key === 'ArrowLeft') {
      console.log('left arrow key pressed!');
    //   handleButtonClick_next();
      buttonRef_before.current.click();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
}, []);


  return (
    <div>
      <br />
      <div id="a1" style={{ marginLeft: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", height: "70vh" }}>
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
            {displayedSentences.map((sentence, index) => (
              <Text key={index}>{sentence}</Text>
            ))}
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
        <div>{counter}/{sentences.length}</div>
        <TextArea
          value={textareaContent}
          onChange={handleTextareaChange}
          placeholder="Enter some text here"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <Row justify="end">
          <Button ref={buttonRef_before} onClick={handleButtonClick_before}>向前</Button>
          <Button ref={buttonRef_next} onClick={handleButtonClick_next}>向后</Button>
          <Button onClick={handleButtonClick_displayall}>上传</Button>
          <Button onClick={clearBtn}>清空</Button>
        </Row>
      </div>
    </div>
  );
};

export default P1;