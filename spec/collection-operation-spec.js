const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');

chai.use(deepEqualInAnyOrder);

const {expect} = chai;

const {teachers, courses, scores, students} = require('../const/data');
const Utils = require('../const/utils');

describe('collection operation', function () {

    test('查询student中的所有记录的sname、Ssex和class列', () => {
        const expected = [
            {sname: '曾华', ssex: '男', class: 95033},
            {sname: '匡明', ssex: '男', class: 95031},
            {sname: '王丽', ssex: '女', class: 95033},
            {sname: '李军', ssex: '男', class: 95033},
            {sname: '王芳', ssex: '女', class: 95031},
            {sname: '陆君', ssex: '男', class: 95031}
        ];

        const actual = students.map(student => ({
            sname: student.sname,
            ssex: student.ssex,
            class: student.class
        }));
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询教师所有的单位中不重复的Depart列', () => {
        const expected = ['计算机系', '电子工程系'];

        const unique = (departs) => [...new Set(departs)];
        const actual = unique(teachers.map(teacher => teacher.depart));
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询Score中成绩在60到80之间的所有记录', () => {
        const expected = [
            {sno: 105, cno: '3-245', degree: 75},
            {sno: 109, cno: '3-245', degree: 68},
            {sno: 109, cno: '3-105', degree: 76},
            {sno: 101, cno: '3-105', degree: 64},
            {sno: 108, cno: '3-105', degree: 78},
            {sno: 107, cno: '6-106', degree: 79},
        ];

        const actual = scores.filter(score => score.degree > 60 && score.degree < 80);
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询Score中成绩为85，86或88的记录', () => {
        const expected = [
            {sno: 103, cno: '3-245', degree: 86},
            {sno: 105, cno: '3-105', degree: 88},
            {sno: 101, cno: '6-166', degree: 85}
        ];

        const actual = scores.filter(score => score.degree === 85 || score.degree === 86 || score.degree === 88);
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询Student中“95031”班或性别为“女”的同学记录', () => {
        const expected = [
            {sno: 105, sname: '匡明', ssex: '男', sbirthday: '1975-10-02', class: 95031},
            {sno: 107, sname: '王丽', ssex: '女', sbirthday: '1976-01-23', class: 95033},
            {sno: 109, sname: '王芳', ssex: '女', sbirthday: '1975-02-10', class: 95031},
            {sno: 103, sname: '陆君', ssex: '男', sbirthday: '1974-06-03', class: 95031},

        ];

        const actual = students.filter(student => student.class === 95031 || student.ssex === '女');
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('以Class降序查询Student的所有记录', () => {
        const expected = [
            {sno: 108, sname: '曾华', ssex: '男', sbirthday: '1999-09-01', class: 95033},
            {sno: 107, sname: '王丽', ssex: '女', sbirthday: '1976-01-23', class: 95033},
            {sno: 101, sname: '李军', ssex: '男', sbirthday: '1976-02-20', class: 95033},
            {sno: 105, sname: '匡明', ssex: '男', sbirthday: '1975-10-02', class: 95031},
            {sno: 109, sname: '王芳', ssex: '女', sbirthday: '1975-02-10', class: 95031},
            {sno: 103, sname: '陆君', ssex: '男', sbirthday: '1974-06-03', class: 95031}
        ];

        const actual = students.sort((a, b) => a.class < b.class);
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('以Cno升序、Degree降序查询Score的所有记录', () => {
        const expected = [
            {sno: 103, cno: '3-105', degree: 92},
            {sno: 107, cno: '3-105', degree: 91},
            {sno: 105, cno: '3-105', degree: 88},
            {sno: 103, cno: '3-245', degree: 86},
            {sno: 101, cno: '6-166', degree: 85},
            {sno: 108, cno: '6-166', degree: 81},
            {sno: 107, cno: '6-106', degree: 79},
            {sno: 108, cno: '3-105', degree: 78},
            {sno: 109, cno: '3-105', degree: 76},
            {sno: 105, cno: '3-245', degree: 75},
            {sno: 109, cno: '3-245', degree: 68},
            {sno: 101, cno: '3-105', degree: 64}
        ];

        const actual = scores.sort((a, b) => a.cno.localeCompare(b.cno))
                             .sort((a, b) => a.degree > b.degree);

        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询“95031”班的学生人数', () => {
        const expected = 3;

        const actual = students.filter(student => student.class === 95031).length;
        expect(actual).equal(expected);
    });

    test('查询Score中的最高分的学生学号和课程号', () => {
        const expected = [{sno: 103, cno: '3-105'}];

        const degrees = scores.map(score => score.degree);
        let maxDegree = Utils.max(degrees);

        const actual = scores.filter(score => score.degree === maxDegree)
                             .map(score => ({
                                 sno: score.sno,
                                 cno: score.cno
                             }));
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询‘3-105’号课程的平均分', () => {
        const expected = 81.5;

        const scoresOf3105 = scores.filter(score => score.cno === '3-105');
        const actual = Utils.average(scoresOf3105, 'degree');
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询Score中至少有5名学生选修的并以3开头的课程的平均分数', () => {
        const expected = [{cno: '3-105', average: 81.5}];

        const countByCno = Utils.countByParam(scores, 'cno');

        let specifyCnos = [];
        for (let key in countByCno) {
            if (countByCno[key] >= 5 && key.startsWith('3')) {
                specifyCnos.push(key);
            }
        }

        const actual = specifyCnos.map(cno => {
            const recordsOfCno = scores.filter(score => score.cno === cno);
            const average = Utils.average(recordsOfCno, 'degree');
            return {
                cno,
                average
            };
        });
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询最低分大于70，最高分小于90的Sno列', () => {
        const expected = [105, 108];

        const snoObj = scores.reduce((accum, cur) => {
            accum[cur.sno] ? accum[cur.sno].push(cur.degree) : accum[cur.sno] = [cur.degree];
            return accum;
        }, {});

        const actual = [];
        for (let sno in snoObj) {
            let maxDegree = Utils.max(snoObj[sno]);
            let minDegree = Utils.min(snoObj[sno]);
            if (maxDegree < 90 && minDegree > 70) {
                actual.push(Number(sno));
            }
        }

        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询所有学生的Sname、Cno和Degree列', () => {
        const expected = [
            {sname: '曾华', cno: '3-105', degree: 78},
            {sname: '曾华', cno: '6-166', degree: 81},
            {sname: '匡明', cno: '3-245', degree: 75},
            {sname: '匡明', cno: '3-105', degree: 88},
            {sname: '王丽', cno: '3-105', degree: 91},
            {sname: '王丽', cno: '6-106', degree: 79},
            {sname: '李军', cno: '3-105', degree: 64},
            {sname: '李军', cno: '6-166', degree: 85},
            {sname: '王芳', cno: '3-245', degree: 68},
            {sname: '王芳', cno: '3-105', degree: 76},
            {sname: '陆君', cno: '3-245', degree: 86},
            {sname: '陆君', cno: '3-105', degree: 92}
        ];

        const actual = students.map(student =>
            scores.filter(scoreRecord => scoreRecord.sno === student.sno)
                  .map(score => ({
                      sname: student.sname,
                      cno: score.cno,
                      degree: score.degree
                  }))).reduce((acc, cur) => acc.concat(cur), []);

        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询所有学生的Sno、Cname和Degree列', () => {
        const expected = [
            {sno: 108, cname: '计算机导论', degree: 78},
            {sno: 108, cname: '数据电路', degree: 81},
            {sno: 105, cname: '操作系统', degree: 75},
            {sno: 105, cname: '计算机导论', degree: 88},
            {sno: 107, cname: '计算机导论', degree: 91},
            {sno: 107, cname: undefined, degree: 79},
            {sno: 101, cname: '计算机导论', degree: 64},
            {sno: 101, cname: '数据电路', degree: 85},
            {sno: 109, cname: '操作系统', degree: 68},
            {sno: 109, cname: '计算机导论', degree: 76},
            {sno: 103, cname: '操作系统', degree: 86},
            {sno: 103, cname: '计算机导论', degree: 92},
        ];

        const actual = students.map(student =>
            scores.filter(scoreRecord => scoreRecord.sno === student.sno)
                  .map(score => ({
                      sno: score.sno,
                      cname: (courses.find(cours => cours.cno === score.cno) || {}).cname,
                      degree: score.degree
                  }))).reduce((acc, cur) => acc.concat(cur), []);

        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询所有学生的Sname、Cname和Degree列', () => {
        const expected = [
            {sname: '曾华', cname: '计算机导论', degree: 78},
            {sname: '曾华', cname: '数据电路', degree: 81},
            {sname: '匡明', cname: '操作系统', degree: 75},
            {sname: '匡明', cname: '计算机导论', degree: 88},
            {sname: '王丽', cname: '计算机导论', degree: 91},
            {sname: '王丽', cname: undefined, degree: 79},
            {sname: '李军', cname: '计算机导论', degree: 64},
            {sname: '李军', cname: '数据电路', degree: 85},
            {sname: '王芳', cname: '操作系统', degree: 68},
            {sname: '王芳', cname: '计算机导论', degree: 76},
            {sname: '陆君', cname: '操作系统', degree: 86},
            {sname: '陆君', cname: '计算机导论', degree: 92}
        ];

        const actual = students.map(student =>
            scores.filter(scoreRecord => scoreRecord.sno === student.sno)
                  .map(score => ({
                      sname: student.sname,
                      cname: (courses.find(cours => cours.cno === score.cno) || {}).cname,
                      degree: score.degree
                  }))).reduce((acc, cur) => acc.concat(cur), []);
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询“95033”班所选课程的平均分', () => {
        const expected = 80;

        const studentsOf95033 = students.filter(student => student.class === 95033);
        const scoresOf95033 = studentsOf95033.map(student =>
            scores.filter(score => score.sno === student.sno))
                                             .reduce((acc, cur) => acc.concat(cur), []);

        const actual = Math.round(Utils.average(scoresOf95033, 'degree'));
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询选修“3-105”课程的成绩高于“109”号同学成绩的所有同学的记录', () => {
        const expected = [
            {sno: 103, cno: '3-105', degree: 92},
            {sno: 105, cno: '3-105', degree: 88},
            {sno: 107, cno: '3-105', degree: 91},
            {sno: 108, cno: '3-105', degree: 78}
        ];

        let specifyClass = scores.filter(score => score.cno === '3-105');
        let speccifyScore = specifyClass.find(classItem => classItem.sno === 109).degree;
        let actual = specifyClass.filter(score => score.degree > speccifyScore);
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询score中选学一门以上课程的同学中分数为非最高分成绩的记录', () => {
        const expected = [
            {sno: 101, cno: '3-105', degree: 64},
            {sno: 101, cno: '6-166', degree: 85},
            {sno: 103, cno: '3-245', degree: 86},
            {sno: 105, cno: '3-245', degree: 75},
            {sno: 105, cno: '3-105', degree: 88},
            {sno: 107, cno: '3-105', degree: 91},
            {sno: 107, cno: '6-106', degree: 79},
            {sno: 108, cno: '3-105', degree: 78},
            {sno: 108, cno: '6-166', degree: 81},
            {sno: 109, cno: '3-245', degree: 68},
            {sno: 109, cno: '3-105', degree: 76}
        ];

        let studentMap = Utils.countByParam(scores, 'sno');
        let allRecords = [];
        for (let student in studentMap) {
            if (studentMap[student] > 1) {
                let records = scores.filter(score => score.sno == student);
                allRecords.push(...records);
            }
        }
        let allDegrees = allRecords.map(record => record.degree);
        let maxDegree = Utils.max(allDegrees);
        const actual = allRecords.filter(record => record.degree !== maxDegree);

        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询成绩高于学号为“109”、课程号为“3-105”的成绩的所有记录', () => {
        const expected = [
            {sno: 103, cno: '3-245', degree: 86},
            {sno: 103, cno: '3-105', degree: 92},
            {sno: 105, cno: '3-105', degree: 88},
            {sno: 107, cno: '3-105', degree: 91},
            {sno: 108, cno: '3-105', degree: 78},
            {sno: 101, cno: '6-166', degree: 85},
            {sno: 107, cno: '6-106', degree: 79},
            {sno: 108, cno: '6-166', degree: 81}
        ];

        let specifyRecord = scores.find(score => score.sno === 109 && score.cno === '3-105');
        const actual = scores.filter(score => score.degree > specifyRecord.degree);
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询和学号为108的同学同年出生的所有学生的Sno、Sname和Sbirthday列', () => {
        const expected = [{sno: 108, sname: '曾华', sbirthday: '1999-09-01'}];

        const studentOf108 = students.find(student => student.sno === 108);
        const actual = students
            .filter(student => student.sbirthday === studentOf108.sbirthday)
            .map(student => ({
                sno: student.sno,
                sname: student.sname,
                sbirthday: student.sbirthday
            }));
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询“张旭“教师任课的学生成绩', () => {
        const expected = [
            {sno: 101, cno: '6-166', degree: 85},
            {sno: 108, cno: '6-166', degree: 81}
        ];
        const theTeacher = teachers.find(teacher => teacher.tname === '张旭');
        const theCours = courses.find(cours => cours.tno === theTeacher.tno);
        const actual = scores.filter(score => score.cno === theCours.cno);
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询选修某课程的同学人数多于5人的教师姓名', () => {
        const expected = ['王萍'];

        const countByCno = Utils.countByParam(scores, 'cno');
        let moreThanFiveCnos = [];
        for (let cno  in countByCno) {
            if (countByCno[cno] > 5) {
                moreThanFiveCnos = moreThanFiveCnos.concat(cno);
            }
        }
        const actual = moreThanFiveCnos.map(cno => courses.find(cours => cours.cno === cno))
                                       .map(cours => teachers.find(teacher => teacher.tno === cours.tno).tname);
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询95033班和95031班全体学生的记录', () => {
        const expected = [
            {sno: 108, sname: '曾华', ssex: '男', sbirthday: '1999-09-01', class: 95033},
            {sno: 105, sname: '匡明', ssex: '男', sbirthday: '1975-10-02', class: 95031},
            {sno: 107, sname: '王丽', ssex: '女', sbirthday: '1976-01-23', class: 95033},
            {sno: 101, sname: '李军', ssex: '男', sbirthday: '1976-02-20', class: 95033},
            {sno: 109, sname: '王芳', ssex: '女', sbirthday: '1975-02-10', class: 95031},
            {sno: 103, sname: '陆君', ssex: '男', sbirthday: '1974-06-03', class: 95031}
        ];

        const actual = students.filter(student => student.class === 95033 || student.class === 95031);
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询存在有85分以上成绩的课程Cno.', () => {
        const expected = ['3-245', '3-105'];
        const actual = scores.filter(score => score.degree > 85)
                             .reduce((acc, cur) => {
                                 if (!acc.includes(cur.cno))
                                     acc = acc.concat(cur.cno);
                                 return acc;
                             }, []);
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询出“计算机系“教师所教课程的成绩', () => {
        const expected = [
            {sno: 103, cno: '3-245', degree: 86},
            {sno: 105, cno: '3-245', degree: 75},
            {sno: 109, cno: '3-245', degree: 68},
            {sno: 103, cno: '3-105', degree: 92},
            {sno: 105, cno: '3-105', degree: 88},
            {sno: 109, cno: '3-105', degree: 76},
            {sno: 101, cno: '3-105', degree: 64},
            {sno: 107, cno: '3-105', degree: 91},
            {sno: 108, cno: '3-105', degree: 78}
        ];
        const actual = teachers.filter(techer => techer.depart === '计算机系')
                               .map(teacher => courses.find(cours => cours.tno === teacher.tno))
                               .map(cours => scores.filter(score => score.cno === cours.cno))
                               .reduce((acc, cur) => acc.concat(cur), []);
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询“计算机系”与“电子工程系“教师的Tname和Prof', () => {
        const expected = [
            {tname: '李诚', prof: '副教授'},
            {tname: '张旭', prof: '讲师'},
            {tname: '王萍', prof: '助教'},
            {tname: '刘冰', prof: '助教'}
        ];

        const actual = teachers.filter(teacher => teacher.depart === '计算机系' || teacher.depart === '电子工程系')
                               .map(teacher => ({
                                   tname: teacher.tname,
                                   prof: teacher.prof
                               }));
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询选修编号为“3-105“课程且成绩高于选修编号为“3-245”的同学的Cno、Sno和Degree,并按Degree从高到低次序排序', () => {
        const expected = [
            {cno: '3-105', sno: 103, degree: 92},
            {cno: '3-105', sno: 107, degree: 91},
            {cno: '3-105', sno: 105, degree: 88},
        ];
        const maxDegreeOf3245 = Utils.max(scores.filter(score => score.cno === '3-245')
                                                .map(score => score.degree));
        const actual = scores.filter(score => score.cno === '3-105' && score.degree > maxDegreeOf3245)
                             .map(score => ({
                                 cno: score.cno,
                                 sno: score.sno,
                                 degree: score.degree
                             }))
                             .sort((a, b) => a < b);

        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询选修编号为“3-105”且成绩高于选修编号为“3-245”课程的同学的Cno、Sno和Degree.', () => {
        const expected = [
            {cno: '3-105', sno: 103, degree: 92},
            {cno: '3-105', sno: 105, degree: 88},
            {cno: '3-105', sno: 107, degree: 91},
        ];
        const maxDegreeOf3245 = Utils.max(scores.filter(score => score.cno === '3-245')
                                                .map(score => score.degree));
        const actual = scores.filter(score => score.cno === '3-105' && score.degree > maxDegreeOf3245)
                             .map(score => ({
                                 cno: score.cno,
                                 sno: score.sno,
                                 degree: score.degree
                             }));
        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询所有教师和同学的name、sex和birthday.', () => {
        const expected = [
            {sname: '曾华', ssex: '男', sbirthday: '1999-09-01'},
            {sname: '匡明', ssex: '男', sbirthday: '1975-10-02'},
            {sname: '王丽', ssex: '女', sbirthday: '1976-01-23'},
            {sname: '李军', ssex: '男', sbirthday: '1976-02-20'},
            {sname: '王芳', ssex: '女', sbirthday: '1975-02-10'},
            {sname: '陆君', ssex: '男', sbirthday: '1974-06-03'},
            {tname: '李诚', tsex: '男', tbirthday: '1958-12-02'},
            {tname: '张旭', tsex: '男', tbirthday: '1969-03-12'},
            {tname: '王萍', tsex: '女', tbirthday: '1972-05-05'},
            {tname: '刘冰', tsex: '女', tbirthday: '1977-08-14'}
        ];

        const allStudens = students.map(student => ({
            sname: student.sname,
            ssex: student.ssex,
            sbirthday: student.sbirthday
        }));

        const allTeachers = teachers.map(teacher => ({
            tname: teacher.tname,
            tsex: teacher.tsex,
            tbirthday: teacher.tbirthday
        }));
        const actual = allStudens.concat(allTeachers);

        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询所有“女”教师和“女”同学的name、sex和birthday.', () => {
        const expected = [
            {sname: '王丽', ssex: '女', sbirthday: '1976-01-23'},
            {sname: '王芳', ssex: '女', sbirthday: '1975-02-10'},
            {tname: '王萍', tsex: '女', tbirthday: '1972-05-05'},
            {tname: '刘冰', tsex: '女', tbirthday: '1977-08-14'}
        ];

        const studensOfFemale = students.filter(student => student.ssex === '女')
                                        .map(student => ({
                                            sname: student.sname,
                                            ssex: student.ssex,
                                            sbirthday: student.sbirthday
                                        }));

        const teachersOfFemale = teachers.filter(teacher => teacher.tsex === '女')
                                         .map(teacher => ({
                                             tname: teacher.tname,
                                             tsex: teacher.tsex,
                                             tbirthday: teacher.tbirthday
                                         }));
        const actual = studensOfFemale.concat(teachersOfFemale);

        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询成绩比该课程平均成绩低的同学的成绩', () => {
        const expected = [
            {sno: 105, cno: '3-245', degree: 75},
            {sno: 109, cno: '3-245', degree: 68},
            {sno: 109, cno: '3-105', degree: 76},
            {sno: 101, cno: '3-105', degree: 64},
            {sno: 108, cno: '3-105', degree: 78},
            {sno: 108, cno: '6-166', degree: 81} //81.666
        ];

        const actual = scores.reduce((acc, cur) => {
            if (!acc.includes(cur.cno)) {
                acc.push(cur.cno);
            }
            return acc;
        }, []).map(cno => ({
                cno: cno,
                average: Utils.average(scores.filter(score => score.cno === cno), 'degree')
            })
        ).map(averageScore => scores.filter(score => averageScore.cno === score.cno && score.degree < averageScore.average)
        ).reduce((acc, cur) => acc.concat(cur), []);

        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询所有任课教师的Tname和Depart.', () => {
        const expected = [
            {tname: '李诚', depart: '计算机系'},
            {tname: '张旭', depart: '电子工程系'},
            {tname: '王萍', depart: '计算机系'},
            {tname: '刘冰', depart: '电子工程系'}
        ];

        const actual = teachers.map(teacher => ({
            tname: teacher.tname,
            depart: teacher.depart
        }));

        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询所有未讲课的教师的Tname和Depart.', () => {
        const expected = [{
            tname: '刘冰',
            depart: '电子工程系'
        }];

        const actual = teachers.map(teacher => {
            const teachingPerson = courses.find(cours => cours.tno === teacher.tno);
            if (!teachingPerson) {
                return {
                    tname: teacher.tname,
                    depart: teacher.depart
                };
            }
            return [];
        }).reduce((acc, cur) => acc.concat(cur), []);

        expect(actual).to.deep.equalInAnyOrder(expected);
    });

    test('查询至少有2名男生的班号', () => {
        throw new Error();
    });

    test('查询Student中不姓“王”的同学记录', () => {
        throw new Error();
    });

    test('查询Student中每个学生的姓名和年龄', () => {
        throw new Error();
    });

    test('查询Student中最大和最小的Sbirthday日期值', () => {
        throw new Error();
    });

    test('以班号和年龄从大到小的顺序查询Student中的全部记录', () => {
        throw new Error();
    });

    test('查询“男”教师及其所上的课程', () => {
        throw new Error();
    });

    test('查询最高分同学的Sno、Cno和Degree列', () => {
        throw new Error();
    });

    test('查询和“李军”同性别的所有同学的Sname.', () => {
        throw new Error();
    });

    test('查询和“李军”同性别并同班的同学Sname.', () => {
        throw new Error();
    });

    test('查询所有选修“计算机导论”课程的“男”同学的成绩', () => {
        throw new Error();
    });

});