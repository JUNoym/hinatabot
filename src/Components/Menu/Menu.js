import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
import Form from "../Forms/Form";

const Menu = ({ open, ...props }) => {

    const isHidden = open ? true : false;
    const tabIndex = isHidden ? 0 : -1;
    // const [open, setOpen] = useState(false);

    return (
        <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
            <a href="https://github.com/JUNoym?tab=repositories" tabIndex={tabIndex}>
                <span aria-hidden="true">💁🏻‍♂️</span>
        Github
      </a>
            <a href="https://hinata-description.web.app" tabIndex={tabIndex}>
                <span aria-hidden="true">📱</span>
        アプリ概要
        </a>
            <a href="https://your-goodness.web.app/" tabIndex={tabIndex}>
                <span aria-hidden="true">🔯</span>
        いいところ診断
        </a>
        </StyledMenu>
    )
}

Menu.propTypes = {
    open: bool.isRequired,
}

export default Menu;