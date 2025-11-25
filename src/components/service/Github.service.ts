import axios from "axios"
import { showError } from "@utils/errorHandling"

const GITHUB_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN
const GITHUB_USERNAME = "MartinSchubert04"

class GithubService {
  async getCommitData() {
    if (!GITHUB_ACCESS_TOKEN) {
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
        Authorization: `bearer ${GITHUB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    return res.data.data.user.contributionsCollection.contributionCalendar.weeks
  }
}

export const githubService = new GithubService()
