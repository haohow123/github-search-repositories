import { useRef } from "react";
import Proptypes from "prop-types";
import clsx from "clsx";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, "auto"),
    paddingTop: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  title: {
    flexGrow: 1,
  },
  select: {
    minWidth: 140,
    marginRight: theme.spacing(1),
  },
}));

function TableToolbar({ handleSearch, filterList, filter, handleFilter }) {
  const classes = useStyles();
  const searchEl = useRef(null);
  const onSearch = () => {
    const value = searchEl.current.value;
    handleSearch(value);
  };
  const onChange = (event) => {
    const value = event.target.value;
    handleFilter(value);
  };
  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography className={clsx(classes.title)} variant={"subtitle1"}>
        Git Repositories
      </Typography>
      {!!filterList.length && (
        <FormControl
          variant={"outlined"}
          className={clsx(classes.select)}
          size={"small"}
        >
          <InputLabel id={"select-language-label"}>Language</InputLabel>
          <Select
            labelId={"select-language-label"}
            id={"select-language"}
            autoWidth
            labelWidth={75}
            value={filter}
            onChange={onChange}
          >
            <MenuItem value={""}>請選擇</MenuItem>
            {filterList.map((language) => (
              <MenuItem value={language} key={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <FormControl variant={"outlined"} size={"small"}>
        <InputLabel htmlFor={"search"}>搜尋名稱</InputLabel>
        <OutlinedInput
          id={"search"}
          labelWidth={64}
          inputRef={searchEl}
          onKeyDown={(event) => event.key === "Enter" && onSearch()}
          endAdornment={
            <InputAdornment position={"end"}>
              <IconButton aria-label={"search"} onClick={onSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Toolbar>
  );
}

TableToolbar.propTypes = {
  handleSearch: Proptypes.func.isRequired,
  handleFilter: Proptypes.func,
  filterList: Proptypes.array,
  filter: Proptypes.string,
};

export default TableToolbar;
