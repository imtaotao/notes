const path = require('path');
const semver = require('semver');

// 检测版本是否有效，无效则为 null
// console.log(semver.valid('1.0.0-beta'))
// console.log(semver.maxSatisfying(['1.0.0'], '~1.0.0'))

// console.log(semver.valid(semver.coerce('18.0.0-beta')))

// console.log(semver.parse('0.0.2-beta-1645600202647.1'));

// const updateVersion = (val) => {
//   const version = semver.valid(val);
//   if (!version) {
//     throw new Error(`无效的版本号: ${version}`);
//   }
//   const opts = semver.parse(version);
//   return opts.prerelease.length > 0
//     ? semver.inc(version, 'prerelease', opts.prerelease[0])
//     : semver.inc(version, 'patch');
// }

// let version = '2.0.1-beta';
// setInterval(() => {
//   version = updateVersion(version);
//   console.log(version);
// }, 1000);

// console.log(semver.subset('^1.1.3', '^1.0.2')) // sub, super
console.log(semver.subset('17.0.2', '^18.0.0'));
console.log(semver.intersects('17.0.3', '^17.0.4', { loose: true }));
console.log(semver.intersects('17.0.2', ''));

// console.log(semver.inc('1.0.0', 'prerelease', `beta-${+new Date}`)); // 1.0.1-beta-1645598740512.0
// console.log(semver.inc('1.0.0', 'patch', `beta-${+new Date}`)); // 1.0.1
// console.log(semver.inc('1.0.0', 'minor', `beta-${+new Date}`)); // 1.1.0
// console.log(semver.inc('1.0.0', 'major', `beta-${+new Date}`)); // 2.0.0
