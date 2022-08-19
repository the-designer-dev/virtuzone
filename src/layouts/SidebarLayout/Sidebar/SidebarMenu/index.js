import { useContext } from 'react';
import { useRouter } from 'next/router';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import NextLink from 'next/link';
import { SidebarContext } from 'src/contexts/SidebarContext';

import supportservices from 'public/static/images/Icons/supportservices.png';
import client from 'public/static/images/Icons/client.png';
import jurisdiction from 'public/static/images/Icons/jurisdiction.png';
import promotions from 'public/static/images/Icons/promotions.png';
import activities from 'public/static/images/Icons/activities-.png';
import expressacconting from 'public/static/images/Icons/expressacconting.png';
import termsconditions from 'public/static/images/Icons/terms&conditions.png';
import bookanappoitnment from 'public/static/images/Icons/bookanappoitnment.png';
import trade from 'public/static/images/Icons/trade.png';
import visa from 'public/static/images/Icons/visa.png';
import contact from 'public/static/images/Icons/contact.png';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.colors.alpha.trueWhite[10]};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            filter: invert(100%) sepia(0%) saturate(7449%) hue-rotate(50deg) brightness(114%) contrast(104%);


            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            filter: invert(100%) sepia(0%) saturate(7449%) hue-rotate(50deg) brightness(114%) contrast(104%);


            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${theme.colors.alpha.trueWhite[100]};
            color: #cf3239 ;


            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: #cf3239;
            filter: invert(24%) sepia(87%) saturate(2363%) hue-rotate(341deg) brightness(86%) contrast(87%);

            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const router = useRouter();
  const currentRoute = router.pathname;
  console.log(client);
  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/client" passHref>
                  <Button
                    className={currentRoute === '/client' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={client.src} />}
                  >
                    Register New Client
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/company" passHref>
                  <Button
                    className={currentRoute === '/company' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={trade.src} />}
                  >
                    Incorporation Documents
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        {/* <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Incorporation Document
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/office_lease_agreement" passHref>
                  <Button
                    className={
                      currentRoute === '/office_lease_agreement' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={office.src} />}
                  >
                    Office Lease Agreement
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/article_of_incorporation" passHref>
                  <Button
                    className={
                      currentRoute === '/article_of_incorporation'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={article.src} />}
                  >
                    Article of Incorporation
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/share_certificate" passHref>
                  <Button
                    className={
                      currentRoute === '/share_certificate' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={sharecertificates.src} />}
                  >
                    Share Certificate
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/incorporation_certificate" passHref>
                  <Button
                    className={
                      currentRoute === '/incorporation_certificate'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={incorporationcertificates.src} />}
                  >
                    Incorporation Certificate
                  </Button>
                </NextLink>
              </ListItem>

              <ListItem component="div">
                <NextLink href="/immigration_card" passHref>
                  <Button
                    className={
                      currentRoute === '/immigration_card' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={immigrationcard.src} />}
                  >
                    Immigration Card
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List> */}
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Support Services
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/support_services" passHref>
                  <Button
                    className={
                      currentRoute === '/support_services' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={supportservices.src} />}
                  >
                    All Support Services
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Visas
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/visa" passHref>
                  <Button
                    className={currentRoute === '/visa' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={visa.src} />}
                  >
                    Visa
                  </Button>
                </NextLink>
              </ListItem>
              {/* <ListItem component="div">
                <NextLink href="/salary_certificate" passHref>
                  <Button
                    className={
                      currentRoute === '/salary_certificate' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={salarycertificates.src} />}
                  >
                    Salary Certificate
                  </Button>
                </NextLink>
              </ListItem> */}
            </List>
          </SubMenuWrapper>
        </List>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/promotions" passHref>
                  <Button
                    className={currentRoute === '="/promotions' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={promotions.src} />}
                  >
                    Promotions
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/" passHref>
                  <Button
                    className={currentRoute === '="/' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={contact.src} />}
                  >
                    Contact
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/jurisdictions" passHref>
                  <Button
                    className={
                      currentRoute === '="/jurisdictions' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={jurisdiction.src} />}
                  >
                    Jurisdictions
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/" passHref>
                  <Button
                    className={currentRoute === '="/' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={activities.src} />}
                  >
                    Activity
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Cost Calculator
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/components/buttons" passHref>
                  <Button
                    className={
                      currentRoute === '/components/buttons' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={expressacconting.src} />}
                  >
                    Cost Calculator
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/" passHref>
                  <Button
                    className={currentRoute === '="/' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={bookanappoitnment.src} />}
                  >
                    Book an Appointment
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/" passHref>
                  <Button
                    className={currentRoute === '="/' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<img src={termsconditions.src} />}
                  >
                    Terms and Conditions
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
