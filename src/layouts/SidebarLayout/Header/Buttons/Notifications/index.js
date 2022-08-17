import {
  alpha,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import notificationIcon from 'public/static/images/Icons/notification.png';
import { styled } from '@mui/material/styles';
import { formatDistance, subDays } from 'date-fns';

const Notification = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active'
})(({ theme, active }) => ({
  backgroundColor: active ? '#cf3239' : '#fff',
  padding: '10px 20px 10px 10px',
  borderTopLeftRadius: '50%',
  borderBottomLeftRadius: '50%',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  width: 'fit-content'
}));

function HeaderNotifications({ notifications, socket }) {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [allNotifications, setAllNotifications] = useState(notifications);
  useEffect(() => {
    setAllNotifications(notifications);
  }, [notifications]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '113px',
        right: '0px',
        zIndex: 99
      }}
    >
      <Tooltip arrow title="Notifications">
        <Notification active={!isOpen} ref={ref} onClick={handleOpen}>
          <img
            className="icon"
            src={notificationIcon.src}
            style={{
              filter:
                'invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)'
            }}
          />
          <p
            style={{
              fontSize: '10px',
              color: '#fff',
              padding: '1px 5px',
              backgroundColor: '#cf3239',
              borderRadius: '100%',
              border: '1px solid #fff',
              position: 'absolute',
              top: '-6px',
              right: '14px'
            }}
          >
            {allNotifications?.filter((el) => el.read === false).length}
          </p>
        </Notification>
      </Tooltip>

      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Box sx={{ paddingRight: '20px', position: 'relative' }}>
            <img
              className="icon"
              src={notificationIcon.src}
              style={{
                filter:
                  'invert(27%) sepia(76%) saturate(2428%) hue-rotate(339deg) brightness(84%) contrast(91%)'
              }}
            />
            <p
              style={{
                fontSize: '10px',
                color: '#cf3239',
                padding: '1px 5px',
                backgroundColor: '#f8e9e9',
                borderRadius: '100%',
                border: '1px solid #cf3239',
                position: 'absolute',
                top: '-16px',
                right: '14px'
              }}
            >
              {allNotifications?.filter((el) => el.read === false).length}
            </p>
          </Box>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {allNotifications.map((el) => (
            <ListItem
              sx={{ p: 2, minWidth: 350, display: { xs: 'block', sm: 'flex' } }}
            >
              <Box flex="1">
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {el.heading}
                  </Typography>
                  <Typography variant="caption" sx={{ textTransform: 'none' }}>
                    {formatDistance(new Date(el.createdAt), new Date(), {
                      addSuffix: true
                    })}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    Name: {el?.user?.firstName} {el?.user?.lastName} | Phone :{' '}
                    {el?.user?.phone} | Email : {el?.user?.email}
                  </Typography>
                </Box>
                <Typography
                  component="span"
                  variant="body1"
                  color="text.secondary"
                >
                  {el.message}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
}

export default HeaderNotifications;
