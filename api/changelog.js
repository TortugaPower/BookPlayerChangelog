const Octokit = require('@octokit/rest');
const sortBy = require('lodash.sortby');

const octokit = new Octokit({});
const owner = 'TortugaPower';
const repo = 'BookPlayer';

module.exports = async (req, res) => {
	const releases = await octokit.repos.listReleases({
		owner,
		repo,
	});

	res.setHeader('cache-control', 's-maxage=60, stale-while-revalidate');
	res.status(200);
	res.send(
		sortBy(
			releases.data.map(
				({ body, html_url: url, published_at: published, name }) => ({
					url,
					name,
					body,
					published,
				})
			),
			'published'
		).reverse()
	);
};
