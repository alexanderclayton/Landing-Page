import FilterDramaIcon from '@mui/icons-material/FilterDrama';

export const Logo: React.FC = () => {
  return (
    <div className="logo">
        <FilterDramaIcon 
        color="primary"
        sx={{ fontSize: 50, marginLeft: 5 }}/>
        <h1>L</h1>
        <h2>anding Page</h2>
    </div>
  )
}