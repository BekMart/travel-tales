import { rest } from "msw";

// Define the base URL from environment or fallback to deployed API
const baseURL = process.env.REACT_APP_API_URL || "https://travel-api-ca880bcd8809.herokuapp.com/";

// Define a list of mock request handlers for intercepting API calls
export const handlers = [

  // Mock the current user's endpoint
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 10,
        username: "Bekmart",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 10,
        profile_image:
          "https://res.cloudinary.com/dvgobcuck/image/upload/v1/media/images/WhatsApp_Image_2025-04-20_at_11.19.03_bmnfmc",
      })
    );
  }),

  // Mock the logout endpoint
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // Mock the login endpoint
  rest.post(`${baseURL}dj-rest-auth/login/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          pk: 1,
          username: "testuser",
          email: "",
          profile_id: 1,
          profile_image: "https://example.com/image.jpg",
        },
      })
    );
  }),

  // Mock the token refresh endpoint
  rest.post(`${baseURL}dj-rest-auth/token/refresh/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ access: "mocked_access_token" }));
  }),

  // Mock the unread notifications endpoint
  rest.get(`${baseURL}notifications/unread/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: [] }));
  }),
];
