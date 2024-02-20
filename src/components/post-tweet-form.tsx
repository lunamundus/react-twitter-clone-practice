// about React
import { useState } from "react";

// about Firebase
import { addDoc, collection } from "firebase/firestore";

// about Styled Components
import styled from "styled-components";
import { auth, database } from "../firebase";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  border-radius: 20px;
  padding: 20px;
  font-size: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;

  &::placeholder {
    font-size: 16px;
  }

  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  text-align: center;
  border: 1px solid #1d9bf0;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(event.target.value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = auth.currentUser;

    if (!user || isLoading || tweet === "" || tweet.length > 180) {
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(database, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?!"
      />
      <AttachFileButton htmlFor="file">
        {file ? "Photo Added ✅" : "Add Photo"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <SubmitButton
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}

export default PostTweetForm;
