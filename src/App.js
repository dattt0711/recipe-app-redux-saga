
import './App.css';
import {TextField, Button, Grid} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import * as types from "./redux/actionTypes"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(to right, #acb6e5, #86fde8);',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 52,
    padding: '0 30px',
  },
});
function App() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const {recipes} = useSelector(state=>state.data);
  console.log(recipes)
  let dispatch = useDispatch();
  useEffect(()=>{
    dispatch({type: types.FETCH_RECIPE_START,  query})
  }, [query])
  const updateSearch = () => {
    setQuery(search);
    setSearch("");
  }
  return (
    <div className="App">
      <h2>Recipe app</h2>
      <TextField
        style={{ width: '60%' }}
        id="outlined-basic"
        label="Search..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
      <Button
        style={{ marginLeft: '10px' }}
        className={classes.root}
        variant="contained"
        color="primary"
        size="large"
        onClick={updateSearch}
        >
        Search   
      </Button>
      <Grid container spacing={2}>
        {recipes &&
          recipes.hits &&
          recipes.hits.map((item, index) => {
            return (
              <Grid item xs={3} style={{marginTop:'50px'}}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={item.recipe.label}
                    subheader= {item.recipe.source}
                    style={{maxHeight: '60px', overflow: 'hidden'}}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={item.recipe.image}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This impressive paella is a perfect party dish and a fun meal to cook
                      together with your guests. Add 1 cup of frozen peas along with the mussels,
                      if you like.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  );
}

export default App;
