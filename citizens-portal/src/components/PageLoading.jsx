import {Grid, Skeleton} from "@mui/material";

function PageLoading() {
    return (
        <Grid container spacing={1} justifyContent="center" sx={{marginTop: "25px"}} direction="column" alignItems="center">
            <Grid item>
                <Skeleton variant="rectangular" width={700} height={40} />
            </Grid>
            <Grid item>
                <Skeleton variant="rectangular" width={700} height={40} />
            </Grid>
            <Grid item>
                <Skeleton variant="rectangular" width={700} height={40} />
            </Grid>
            <Grid item>
                <Skeleton variant="rectangular" width={700} height={40} />
            </Grid>
            <Grid item>
                <Skeleton variant="rectangular" width={700} height={40} />
            </Grid>
            <Grid item>
                <Skeleton variant="rectangular" width={700} height={40} />
            </Grid>
            <Grid item>
                <Skeleton variant="rectangular" width={700} height={40} />
            </Grid>
            <Grid item>
                <Skeleton variant="rectangular" width={700} height={40} />
            </Grid>
            <Grid item>
                <Skeleton variant="rectangular" width={700} height={40} />
            </Grid>
        </Grid>
    );
}

export default PageLoading;