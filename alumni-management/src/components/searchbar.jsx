import React from "react";
import "./style.css";

const AlumniDirectory = () => {
  return (
    <div>
      <div className="background-container" />

      <div className="container">
        <div className="top-bar">
          <input className="search-box" type="text" placeholder="Search" />
          <form action="action.php" method="post">
            <button className="button" type="submit" name="filter">
              Filters
            </button>
          </form>

          <form action="action.php" method="post">
            <div className="account">
              <button type="submit" name="account">
                Account
              </button>
            </div>
          </form>
        </div>

        <div className="alumni-card">
          <div>Alumni-1 name</div>
          <form action="action.php" method="post">
            <input type="hidden" name="alumni" value="Alumni-1" />
            <button className="status-button" type="submit" name="status">
              Status
            </button>
          </form>
        </div>

        <div className="alumni-card">
          <div>Alumni-2 name</div>
          <form action="action.php" method="post">
            <input type="hidden" name="alumni" value="Alumni-2" />
            <button className="status-button" type="submit" name="status">
              Status
            </button>
          </form>
        </div>

        <div className="alumni-card">
          <div>Alumni-3 name</div>
          <form action="action.php" method="post">
            <input type="hidden" name="alumni" value="Alumni-3" />
            <button className="status-button" type="submit" name="status">
              Status
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AlumniDirectory;
