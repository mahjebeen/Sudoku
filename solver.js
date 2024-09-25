function isValid(grid, r, c, k) { //checking if k can be placed in the cell
    const notInRow = !grid[r].includes(k);
    const notInColumn = !grid.map(row => row[c]).includes(k);
    const notInBox = !Array.from({ length: 3 }, (_, i) =>
      Array.from({ length: 3 }, (_, j) => grid[r - (r % 3) + i][c - (c % 3) + j])
    ).flat().includes(k);
  
    return notInRow && notInColumn && notInBox;
  }
  function solve(grid, r = 0, c = 0) {
    if (r === 9) {
      return true;  // Puzzle solved
    } else if (c === 9) { //do to next row
      return solve(grid, r + 1, 0);
    } else if (grid[r][c] !== 0) { //if already filled move to the next column
      return solve(grid, r, c + 1);
    } else {
      for (let k = 1; k <= 9; k++) {
        if (isValid(grid, r, c, k)) {
          grid[r][c] = k;
  
          // Check for uniqueness after filling the cell
          if (solve(grid, r, c + 1)) {
            // If a solution is found, check if it is unique
            if (isUniqueSolution(grid)) {
              return true;  // Unique solution found
            }
          }
  
          grid[r][c] = 0;  // Backtrack if the solution is not unique
        }
      }
      return false;
    }
  }
  
  function isUniqueSolution(grid) {
    const solutionCount = [];  // Use an array to store the count of solutions
  
    // Recursive function to count solutions
    function countSolutions(grid, r = 0, c = 0) {
      if (r === 9) {
        solutionCount.push(1);  // Increment the solution count
      } else if (c === 9) {
        countSolutions(grid, r + 1, 0);
      } else if (grid[r][c] !== 0) {
        countSolutions(grid, r, c + 1);
      } else {
        for (let k = 1; k <= 9; k++) {
          if (isValid(grid, r, c, k)) {
            grid[r][c] = k;
            countSolutions(grid, r, c + 1);
            grid[r][c] = 0;  // Backtrack
          }
        }
      }
    }
  
    countSolutions(grid);
  
    // to ensure there is only one solution
    return solutionCount.length === 1;
  }
  
