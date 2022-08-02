import axios from "axios";

export default axios.create({
    headers: {
    Authorization: `token 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`,
    Accept: "application/vnd.github.v3+json",
  },
});