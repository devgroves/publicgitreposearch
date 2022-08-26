import axios from "axios";

export default axios.create({
    headers: {
    Authorization: `token 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`,
    Accept: "application/vnd.github.v3+json",
  },
});