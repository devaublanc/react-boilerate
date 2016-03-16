export default class Social {


    constructor() {
        this.github_url = 'https://api.github.com';
    }

    getFollowersCount(url) {

        return new Promise((resolve) => {
            this.callAPI(this.github_url + url).then((result) => {
                resolve(result.count);
            });
        });

    }

    getContributionCount(url) {

        return new Promise((resolve) => {
            this.callAPI(this.github_url + url).then((result) => {
                resolve(result.count);
            });
        });

    }

    callAPI(url) {

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    url,
                    count: 13
                });
            }, 2000);
        });

    }
}
