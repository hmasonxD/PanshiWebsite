import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorder, Chat } from "@mui/icons-material";

interface User {
  id: string;
  firstName: string;
  age: number;
  bio: string;
  profilePicture: string;
}

interface UserCardProps {
  user: User;
  onLike: () => void;
  onMessage: () => void;
  isLiked: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onLike,
  onMessage,
  isLiked,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={user.profilePicture}
        alt={user.firstName}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {user.firstName}, {user.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.bio}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Button
          variant="contained"
          color={isLiked ? "secondary" : "primary"}
          startIcon={isLiked ? <Favorite /> : <FavoriteBorder />}
          onClick={onLike}
        >
          {isLiked ? "Liked" : "Like"}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Chat />}
          onClick={onMessage}
        >
          Message
        </Button>
      </Box>
    </Card>
  );
};

export default UserCard;
