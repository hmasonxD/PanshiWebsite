import React, { useState, useEffect, useCallback, useRef } from "react";
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
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from "@mui/material";
import { Send, ArrowBack, Add, Favorite, Chat } from "@mui/icons-material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
}

interface Conversation {
  userId: string;
  userName: string;
  lastMessage: string;
}

interface User {
  id: string;
  firstName: string;
  profileIcon?: string;
}

const Messaging: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<Conversation | null>(null);
  const [newConversationDialogOpen, setNewConversationDialogOpen] =
    useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchUserDetails = useCallback(async (userId: string) => {
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
  }, []);

  const fetchConversations = useCallback(async () => {
    try {
      const currentUserId = localStorage.getItem("userId");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/conversations?userId=${currentUserId}`
      );
      setConversations(response.data);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  }, []);

  const fetchAllUsers = useCallback(async () => {
    try {
      const currentUserId = localStorage.getItem("userId");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users`,
        {
          params: { currentUserId },
        }
      );
      setAllUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch all users:", error);
    }
  }, []);

  const fetchMessages = useCallback(async (userId: string) => {
    try {
      const currentUserId = localStorage.getItem("userId");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/messages/${userId}?currentUserId=${currentUserId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");
    if (userId) {
      setSelectedConversation(userId);
      fetchUserDetails(userId);
    }
    fetchConversations();
    fetchAllUsers();

    return () => {
      // Clean up any ongoing requests or subscriptions here
    };
  }, [location, fetchUserDetails, fetchConversations, fetchAllUsers]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedConversation) {
      try {
        const currentUserId = localStorage.getItem("userId");
        await axios.post(`${process.env.REACT_APP_API_URL}/api/messages`, {
          senderId: parseInt(currentUserId!),
          recipientId: parseInt(selectedConversation),
          content: newMessage,
        });
        setNewMessage("");
        fetchMessages(selectedConversation);
        fetchConversations();
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleBackToMatches = () => {
    navigate("/matches");
  };

  const handleNewConversation = (userId: string) => {
    setSelectedConversation(userId);
    fetchUserDetails(userId);
    setNewConversationDialogOpen(false);
  };

  const handleLikeUser = async (userId: string) => {
    try {
      const currentUserId = localStorage.getItem("userId");
      await axios.post(`${process.env.REACT_APP_API_URL}/api/like/${userId}`, {
        likerId: currentUserId,
      });
      // Update the UI to reflect the like
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isLiked: true } : user
        )
      );
    } catch (error) {
      console.error("Failed to like user:", error);
    }
  };

  const formatDate = (timestamp: string) => {
    try {
      const date = parseISO(timestamp);
      return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch (error) {
      console.error("Invalid date:", timestamp);
      return "Invalid Date";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, height: "calc(100vh - 100px)" }}>
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            width: "30%",
            borderRight: `1px solid ${theme.palette.divider}`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button startIcon={<ArrowBack />} onClick={handleBackToMatches}>
              Back to Matches
            </Button>
            <IconButton onClick={() => setNewConversationDialogOpen(true)}>
              <Add />
            </IconButton>
          </Box>
          <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            {conversations.map((conversation, index) => (
              <React.Fragment key={conversation.userId}>
                <ListItem
                  button
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
                {index < conversations.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            bgcolor: theme.palette.background.default,
          }}
        >
          {selectedConversation ? (
            <>
              <Box
                sx={{
                  p: 2,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6">
                  {selectedUser?.userName ||
                    conversations.find((c) => c.userId === selectedConversation)
                      ?.userName}
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
                {messages.map((message, index) => (
                  <React.Fragment key={message.id}>
                    {index === 0 ||
                    formatDate(message.createdAt).split(" at ")[0] !==
                      formatDate(messages[index - 1].createdAt).split(
                        " at "
                      )[0] ? (
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          textAlign: "center",
                          my: 2,
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {formatDate(message.createdAt).split(" at ")[0]}
                      </Typography>
                    ) : null}
                    <Box
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
                          bgcolor:
                            message.senderId === localStorage.getItem("userId")
                              ? theme.palette.primary.main
                              : theme.palette.background.paper,
                          color:
                            message.senderId === localStorage.getItem("userId")
                              ? theme.palette.primary.contrastText
                              : theme.palette.text.primary,
                        }}
                      >
                        <Typography variant="body1">
                          {message.content}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            mt: 0.5,
                            textAlign: "right",
                            color: "inherit",
                            opacity: 0.7,
                          }}
                        >
                          {formatDate(message.createdAt).split(" at ")[1]}
                        </Typography>
                      </Paper>
                    </Box>
                  </React.Fragment>
                ))}
                <div ref={messagesEndRef} />
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderTop: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  sx={{ bgcolor: theme.palette.background.paper }}
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
      <Dialog
        open={newConversationDialogOpen}
        onClose={() => setNewConversationDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Start a New Conversation</DialogTitle>
        <DialogContent>
          <List>
            {allUsers.map((user, index) => (
              <React.Fragment key={user.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={user.profileIcon}>{user.firstName[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.firstName} />
                  <IconButton
                    onClick={() => handleLikeUser(user.id)}
                    color="primary"
                  >
                    <Favorite />
                  </IconButton>
                  <IconButton
                    onClick={() => handleNewConversation(user.id)}
                    color="primary"
                  >
                    <Chat />
                  </IconButton>
                </ListItem>
                {index < allUsers.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewConversationDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Messaging;
