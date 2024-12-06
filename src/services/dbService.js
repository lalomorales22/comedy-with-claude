// Database queries

export const jokeQueries = {
  // Create a new joke
  createJoke: `
    INSERT INTO jokes (comedian_id, content, type, media_url)
    VALUES (?, ?, ?, ?)
  `,

  // Get all jokes with comedian info
  getAllJokes: `
    SELECT 
      j.*,
      c.username,
      c.name,
      c.avatar_url,
      (SELECT COUNT(*) FROM comments WHERE joke_id = j.id) as comments_count
    FROM jokes j
    JOIN comedians c ON j.comedian_id = c.id
    ORDER BY j.created_at DESC
  `,

  // Get jokes by comedian
  getJokesByComedian: `
    SELECT * FROM jokes
    WHERE comedian_id = ?
    ORDER BY created_at DESC
  `,

  // Update joke likes
  updateJokeLikes: `
    UPDATE jokes
    SET likes = likes + 1
    WHERE id = ?
  `,
};

export const performanceQueries = {
  // Create a new performance
  createPerformance: `
    INSERT INTO performances (
      comedian_id, title, description, performance_time,
      duration_minutes, status
    ) VALUES (?, ?, ?, ?, ?, ?)
  `,

  // Get upcoming performances
  getUpcomingPerformances: `
    SELECT 
      p.*,
      c.username,
      c.name,
      c.avatar_url
    FROM performances p
    JOIN comedians c ON p.comedian_id = c.id
    WHERE p.performance_time > CURRENT_TIMESTAMP
    AND p.status != 'cancelled'
    ORDER BY p.performance_time ASC
  `,

  // Update performance status
  updatePerformanceStatus: `
    UPDATE performances
    SET status = ?
    WHERE id = ?
  `,
};

export const workshopQueries = {
  // Create a new workshop
  createWorkshop: `
    INSERT INTO workshops (
      instructor_id, title, description, date_time,
      duration_minutes, capacity, price, level
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,

  // Get upcoming workshops
  getUpcomingWorkshops: `
    SELECT 
      w.*,
      c.username as instructor_username,
      c.name as instructor_name,
      c.avatar_url as instructor_avatar
    FROM workshops w
    JOIN comedians c ON w.instructor_id = c.id
    WHERE w.date_time > CURRENT_TIMESTAMP
    ORDER BY w.date_time ASC
  `,
};

export const commentQueries = {
  // Create a new comment
  createComment: `
    INSERT INTO comments (joke_id, comedian_id, content)
    VALUES (?, ?, ?)
  `,

  // Get comments for a joke
  getJokeComments: `
    SELECT 
      c.*,
      co.username,
      co.name,
      co.avatar_url
    FROM comments c
    JOIN comedians co ON c.comedian_id = co.id
    WHERE c.joke_id = ?
    ORDER BY c.created_at DESC
  `,
};

export const comedianQueries = {
  // Create a new comedian
  createComedian: `
    INSERT INTO comedians (username, email, password_hash, name, bio, location, avatar_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,

  // Get comedian by username
  getComedianByUsername: `
    SELECT id, username, email, name, bio, location, avatar_url, created_at
    FROM comedians
    WHERE username = ?
  `,

  // Update comedian profile
  updateComedianProfile: `
    UPDATE comedians
    SET name = ?, bio = ?, location = ?, avatar_url = ?
    WHERE id = ?
  `,
};