import clsx from "clsx";
import Proptypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import byString from "./util/StringProperties";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import IconButton from "@material-ui/core/IconButton";

const columns = [
  { key: "name", text: "Name" },
  { key: "language", text: "Language" },
  { key: "owner.login", text: "Owner" },
  { key: "watchers_count", text: "Watchers" },
  { key: "forks_count", text: "Forks" },
  { key: "stargazers_count", text: "Stars" },
  { key: "actions", text: "" },
];

const useStyles = makeStyles({
  stickyCell: {
    top: 64,
  },
});

function RepositoriesTable({
  repositories,
  loading,
  rowsPerPage,
  page,
  sort,
  handleSort,
}) {
  const classes = useStyles();
  const onClick = () => {
    if (sort === "desc") {
      handleSort("asc");
    } else {
      handleSort("desc");
    }
  };
  const forwardGithub = (url) => {
    window.open(url, "_blank");
  };
  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {columns.map(({ key, text }) => (
            <TableCell
              key={key}
              classes={{ stickyHeader: clsx(classes.stickyCell) }}
              sortDirection={sort}
            >
              {key !== "stargazers_count" ? (
                text
              ) : (
                <TableSortLabel active direction={sort} onClick={onClick}>
                  {text}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {repositories.length && !loading ? (
          repositories
            .slice(
              (page % (100 / rowsPerPage)) * rowsPerPage,
              ((page % (100 / rowsPerPage)) + 1) * rowsPerPage
            )
            .map((repository) => (
              <TableRow key={repository.id}>
                {columns.map(({ key }) =>
                  key !== "actions" ? (
                    <TableCell key={key}>{byString(repository, key)}</TableCell>
                  ) : (
                    <TableCell key={key} width={100}>
                      <IconButton
                        aria-label={"go to repository"}
                        onClick={() => forwardGithub(repository["html_url"])}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </TableCell>
                  )
                )}
              </TableRow>
            ))
        ) : (
          <TableRow tabIndex={-1} style={{ height: 10 * 53 }}>
            <TableCell colSpan={columns.length}>
              {loading ? (
                <Box display={"flex"} justifyContent={"center"}>
                  <CircularProgress />
                </Box>
              ) : (
                <Typography color={"secondary"} align={"center"}>
                  ????????????
                </Typography>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

RepositoriesTable.propTypes = {
  loading: Proptypes.bool,
  repositories: Proptypes.array,
  rowsPerPage: Proptypes.number,
  page: Proptypes.number,
  handleSort: Proptypes.func,
  sort: Proptypes.string,
};

export default RepositoriesTable;
