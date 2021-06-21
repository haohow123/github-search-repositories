import { useState } from "react";
import clsx from "clsx";
import distinctArray from "./util/DistinctArray";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Box from "@material-ui/core/Box";
import TablePagination from "@material-ui/core/TablePagination";

import TableToolbar from "./TableToolbar";
import { useObservable, useObservableState } from "observable-hooks";
import { from } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import RepositoriesTable from "./RepositoriesTable";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e5e5e5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
  },
  container: {
    height: 590 + 64 + 24 + 24,
  },
  helperText: {
    position: "absolute",
    marginTop: theme.spacing(-2),
  },
  title: {
    flexGrow: 1,
  },
  addButton: {
    marginLeft: theme.spacing(1),
  },
}));

const fetchRepositories = (query) => {
  return fetch(`https://api.github.com/search/repositories?${query}`).then(
    (res) => res.json()
  );
};

function App() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [searchPage, setSearchPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("desc");

  const query$ = useObservable(
    (input$) =>
      input$.pipe(
        map(([search, rowsPerPage, page, language, sort]) => {
          let result = "";
          result += `q=${encodeURIComponent(
            search ? search : "react"
          )} in:name`;
          if (language) {
            result += `+language:${encodeURIComponent(language)}`;
          }
          result += `&per_page=${100}`;
          if (page) {
            result += `&page=${encodeURIComponent(page)}`;
          }
          result += "&sort=stars";
          result += `&order=${encodeURIComponent(sort)}`;
          return result;
        })
      ),
    [search, rowsPerPage, searchPage, filter, sort]
  );
  const search$ = useObservable(() =>
    query$.pipe(switchMap((query) => from(fetchData(query))))
  );
  const repositories = useObservableState(search$, () => []);
  const filterList = useObservableState(
    useObservable(
      (input$) =>
        input$.pipe(
          map(([repositories]) =>
            distinctArray(repositories.map(({ language }) => language))
          )
        ),
      [repositories]
    ),
    () => []
  );
  const fetchData = async (query) => {
    setIsLoading(true);
    const { items, total_count } = await fetchRepositories(query);
    setIsLoading(false);
    setTotal(total_count);
    return items || [];
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    //if mod(100) last number to zero or zero to last number change search page
    const oriMod100 = (rowsPerPage * page) % 100;
    const newMod100 = (rowsPerPage * newPage) % 100;
    if (
      (oriMod100 === 100 - rowsPerPage && !newMod100) ||
      (!oriMod100 && newMod100 === 100 - rowsPerPage) ||
      (!oriMod100 && !newMod100)
    ) {
      setSearchPage(~~((rowsPerPage * newPage) / 100) + 1);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(0);
    setSearchPage(1);
  };

  const handleFilter = (value) => {
    setFilter(value);
  };

  const handleSort = (value) => {
    setSort(value);
  };

  return (
    <div className={clsx(classes.root)}>
      <Container maxWidth={"lg"}>
        <Paper>
          <TableContainer className={clsx(classes.container)}>
            <TableToolbar
              handleSearch={handleSearch}
              filterList={filterList}
              filter={filter}
              handleFilter={handleFilter}
            />
            <RepositoriesTable
              repositories={repositories}
              loading={isLoading}
              rowsPerPage={rowsPerPage}
              page={page}
              sort={sort}
              handleSort={handleSort}
            />
          </TableContainer>
          {isLoading ? (
            <Box height={52} />
          ) : (
            <TablePagination
              component={"div"}
              count={total}
              onChangePage={handleChangePage}
              page={page}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 25, 100]}
            />
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default App;
