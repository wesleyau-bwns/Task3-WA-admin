import { useLocation, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

export default function NavbarBreadcrumbs() {
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);

  const formatLabel = (segment) =>
    segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const buildPath = (index) => "/" + segments.slice(0, index + 1).join("/");

  return (
    <StyledBreadcrumbs separator={<NavigateNextRoundedIcon fontSize="small" />}>
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;

        return isLast ? (
          <Typography key={segment} sx={{ fontWeight: 600 }}>
            {formatLabel(segment)}
          </Typography>
        ) : (
          <Link
            key={segment}
            to={buildPath(index)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography>{formatLabel(segment)}</Typography>
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
}
