import React from 'react';
import {Popover, List, ListItemText, ListItemButton} from '@mui/material';

interface LanguagePopupProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
}

const LanguagePopup: React.FC<LanguagePopupProps> = ({ anchorEl, onClose }) => {
    const handleLanguageSelect = (language: string) => {
        // Implement your logic here for handling language selection
        console.log(`Selected language: ${language}`);
        onClose(); // Close the popup after selecting a language
    };

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <List>
                <ListItemButton onClick={() => handleLanguageSelect('English')}>
                    <ListItemText primary="English" />
                </ListItemButton>
                <ListItemButton onClick={() => handleLanguageSelect('Spanish')}>
                    <ListItemText primary="Spanish" />
                </ListItemButton>
                {/* Add more languages as needed */}
            </List>
        </Popover>
    );
};

export default LanguagePopup;
