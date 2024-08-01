import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  userId: string;
  userName: string;
  lastMessage: string;
}

const Messaging: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<Conversation | null>(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");
    if (userId) {
      setSelectedConversation(userId);
      fetchUserDetails(userId);
    }
    fetchConversations();
  }, [location]);

  const fetchUserDetails = async (userId: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user-profile/${userId}`
      );
      setSelectedUser({
        userId: userId,
        userName: response.data.firstName,
        lastMessage: "",
      });
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const fetchConversations = async () => {
    try {
      const currentUserId = localStorage.getItem("userId");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/conversations?userId=${currentUserId}`
      );
      setConversations(response.data);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation]);

  const fetchMessages = async (userId: string) => {
    try {
      const currentUserId = localStorage.getItem("userId");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/messages/${userId}?currentUserId=${currentUserId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedConversation) {
      try {
        const currentUserId = localStorage.getItem("userId");
        await axios.post(`${process.env.REACT_APP_API_URL}/api/messages`, {
          senderId: currentUserId,
          recipientId: selectedConversation,
          content: newMessage,
        });
        setNewMessage("");
        fetchMessages(selectedConversation);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, height: "calc(100vh - 100px)" }}>
      <Paper elevation={3} sx={{ height: "100%", display: "flex" }}>
        <Box
          sx={{
            width: "30%",
            borderRight: "1px solid #e0e0e0",
            overflowY: "auto",
          }}
        >
          <List>
            {selectedUser && (
              <ListItem
                button
                selected={selectedConversation === selectedUser.userId}
                onClick={() => setSelectedConversation(selectedUser.userId)}
              >
                <ListItemAvatar>
                  <Avatar>{selectedUser.userName[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={selectedUser.userName}
                  secondary={selectedUser.lastMessage}
                />
              </ListItem>
            )}
            {conversations.map((conversation) => (
              <ListItem
                button
                key={conversation.userId}
                selected={selectedConversation === conversation.userId}
                onClick={() => setSelectedConversation(conversation.userId)}
              >
                <ListItemAvatar>
                  <Avatar>{conversation.userName[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={conversation.userName}
                  secondary={conversation.lastMessage}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ width: "70%", display: "flex", flexDirection: "column" }}>
          {selectedConversation ? (
            <>
              <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      mb: 2,
                      display: "flex",
                      justifyContent:
                        message.senderId === localStorage.getItem("userId")
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <Paper
                      elevation={1}
                      sx={{
                        p: 1,
                        maxWidth: "70%",
                        backgroundColor:
                          message.senderId === localStorage.getItem("userId")
                            ? "#e3f2fd"
                            : "#f5f5f5",
                      }}
                    >
                      <Typography variant="body1">{message.content}</Typography>
                      <Typography
                        variant="caption"
                        sx={{ display: "block", mt: 0.5, textAlign: "right" }}
                      >
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{ p: 2, borderTop: "1px solid #e0e0e0", display: "flex" }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<Send />}
                  onClick={handleSendMessage}
                  sx={{ ml: 1 }}
                >
                  Send
                </Button>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h6" color="textSecondary">
                Select a conversation to start messaging
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Messaging;
