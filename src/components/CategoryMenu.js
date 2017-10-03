import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


const CategoryMenu = (props) => (
    <IconMenu
        iconButtonElement={
            <FlatButton
                label={props.text}
                labelStyle={{ fontSize: '18px' }}
                style={{marginTop: 7, color:'white'}}>

            </FlatButton>
        }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="Countries" onClick={() => props.onClick("country")} />
        <MenuItem primaryText="Animals" onClick={() => props.onClick("animal")}/>
        <MenuItem primaryText="Pirate" onClick={() => props.onClick("pirate")}/>
    </IconMenu>
);

CategoryMenu.muiName = 'IconMenu';

export default CategoryMenu;
