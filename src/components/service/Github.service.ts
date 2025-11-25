import axios from "axios"
import { showError } from "@utils/errorHandling"

const ACCESS_TOKEN = "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"
const GITHUB_USERNAME = "MartinSchubert04"

class GithubService {
  async getCommitData() {
    if (!ACCESS_TOKEN) {
      showError("Error: GITHUB_ACCESS_TOKEN no está definido en las variables de entorno.")
      return
    }

    const GQL_QUERY = `
            query {
                user(login: "${GITHUB_USERNAME}") {
                    contributionsCollection {
                        contributionCalendar {
                            weeks {
                                contributionDays {
                                    date
                                    contributionCount
                                    color
                                }
                            }
                        }
                    }
                }
            }
        `

    const body = {
      query: GQL_QUERY,
    }

    const res = await axios.post("https://api.github.com/graphql", body, {
      headers: {
        Authorization: `bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    return res.data.data.user.contributionsCollection.contributionCalendar.weeks
  }
}

export const githubService = new GithubService()
