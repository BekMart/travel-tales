import { rest } from "msw";

const baseURL = process.env.REACT_APP_API_URL;

export const handlers = [
  rest.get(`${baseURL}dj-res-auth/user/`, (reg, res, ctx) => {
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
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
