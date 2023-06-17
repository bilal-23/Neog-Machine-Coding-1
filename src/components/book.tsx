import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useBooksStore } from "../store/books-store";

interface Props {
  id: string;
  name: string;
  image: string;
  shelf: "currentlyReading" | "wantToRead" | "read" | "none";
  author: string;
}
const options = [
  "Move To",
  "Currently Reading",
  "Want to Read",
  "Read",
  "None",
];

const Book: React.FC<Props> = ({ id, name, author, image, shelf }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(() => {
    if (shelf === "currentlyReading") {
      return 1;
    } else if (shelf === "wantToRead") {
      return 2;
    } else if (shelf === "read") {
      return 3;
    } else {
      return 4;
    }
  });
  const { changeShelf } = useBooksStore();

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    let selectedShelf = shelf;
    setSelectedIndex(index);
    switch (index) {
      case 1:
        selectedShelf = "currentlyReading";
        break;
      case 2:
        selectedShelf = "wantToRead";
        break;
      case 3:
        selectedShelf = "read";
        break;
      case 4:
        selectedShelf = "none";
        break;
    }
    changeShelf(id, selectedShelf);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="book">
      <img src={image} alt={name} />
      <div className="book-details" style={{ position: "relative" }}>
        <div>
          <p className="book-name">{name}</p>
          <p className="book-author">{author}</p>
        </div>
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
          sx={{
            borderRadius: "0px",
            top: "0px",
            right: "0px",
          }}
        >
          <Button
            sx={{ padding: 0, backgroundColor: "#999" }}
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        style={{
                          backgroundColor:
                            index === selectedIndex ? "#999" : "white",
                          fontSize: "14px",
                          fontWeight:
                            index === selectedIndex ? "bold" : "normal",
                          padding: "5px 10px",
                        }}
                        key={option}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default Book;
