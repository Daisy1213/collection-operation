const { teachers, courses, scores, students } = require('../data');
const Utils = require('../utils');

describe('collection operation', function() {

    it('查询student中的所有记录的sname、Ssex和class列', () => {
        const expected = [
            { sname: '曾华', ssex: '男', class: 95033 },
            { sname: '匡明', ssex: '男', class: 95031 },
            { sname: '王丽', ssex: '女', class: 95033 },
            { sname: '李军', ssex: '男', class: 95033 },
            { sname: '王芳', ssex: '女', class: 95031 },
            { sname: '陆君', ssex: '男', class: 95031 }
        ];

        const actual = students.map(student => ({
            sname: student.sname,
            ssex: student.ssex,
            class: student.class
        }));
        expect(actual).toEqual(expected);
    });

    it('查询教师所有的单位中不重复的Depart列', () => {
        const expected = ['计算机系', '电子工程系'];

        const unique = (departs) => [...new Set(departs)];
        const actual = unique(teachers.map(teacher => teacher.depart));
        expect(actual).toEqual(expected);
    });

    it('查询Score中成绩在60到80之间的所有记录', () => {
        const expected = [
            { sno: 105, cno: '3-245', degree: 75 },
            { sno: 109, cno: '3-245', degree: 68 },
            { sno: 109, cno: '3-105', degree: 76 },
            { sno: 101, cno: '3-105', degree: 64 },
            { sno: 108, cno: '3-105', degree: 78 },
            { sno: 107, cno: '6-106', degree: 79 },
        ];

        const actual = scores.filter(score => score.degree > 60 && score.degree < 80);
        expect(actual).toEqual(expected);
    });

    it('查询Score中成绩为85，86或88的记录', () => {
        const expected = [
            { sno: 103, cno: '3-245', degree: 86 },
            { sno: 105, cno: '3-105', degree: 88 },
            { sno: 101, cno: '6-166', degree: 85 }
        ];

        const actual = scores.filter(score => score.degree === 85 || score.degree === 86 || score.degree === 88);
        expect(actual).toEqual(expected);
    });

    it('查询Student中“95031”班或性别为“女”的同学记录', () => {
        const expected = [
            { sno: 105, sname: '匡明', ssex: '男', sbirthday: '1975-10-02', class: 95031 },
            { sno: 107, sname: '王丽', ssex: '女', sbirthday: '1976-01-23', class: 95033 },
            { sno: 109, sname: '王芳', ssex: '女', sbirthday: '1975-02-10', class: 95031 },
            { sno: 103, sname: '陆君', ssex: '男', sbirthday: '1974-06-03', class: 95031 },

        ];

        const actual = students.filter(student => student.class === 95031 || student.ssex === '女');
        expect(actual).toEqual(expected);
    });

    it('以Class降序查询Student的所有记录', () => {
        const expected = [
            { sno: 108, sname: '曾华', ssex: '男', sbirthday: '1999-09-01', class: 95033 },
            { sno: 107, sname: '王丽', ssex: '女', sbirthday: '1976-01-23', class: 95033 },
            { sno: 101, sname: '李军', ssex: '男', sbirthday: '1976-02-20', class: 95033 },
            { sno: 105, sname: '匡明', ssex: '男', sbirthday: '1975-10-02', class: 95031 },
            { sno: 109, sname: '王芳', ssex: '女', sbirthday: '1975-02-10', class: 95031 },
            { sno: 103, sname: '陆君', ssex: '男', sbirthday: '1974-06-03', class: 95031 }
        ];

        const actual = students.sort((a, b) => a.class <  b.class);
        expect(actual).toEqual(expected);
    });

    it('以Cno升序、Degree降序查询Score的所有记录', () => {
        // const arr = [
        //     { x: 4, y: 3 },
        //     { x: 2, y: 1 },
        //     { x: 1, y: 6 },
        //     { x: 2, y: 3 },
        //     { x: 3, y: 4 },
        //     { x: 2, y: 5 },
        //     { x: 3, y: 6 },
        //     { x: 4, y: 6 }
        // ];

        // const sort1 = arr.sort((s1, s2) => s1.x - s2.x);
        // const sort2 = sort1.sort((s1, s2) => s2.y - s1.y);
        // fail('unimplement');
    });

    it('查询“95031”班的学生人数', () => {
        const expected = 3;

        const actual = students.filter(student => student.class === 95301).length;
        expect(actual).toEqual(expected);
    });

    it('查询Score中的最高分的学生学号和课程号', () => {
        const expected = [{ sno: 103, cno: '3-105' }];

        const degrees = scores.map(score => score.degree);
        let maxDegree = Utils.max(degrees);

        const actual = scores.filter(score => score.degree === maxDegree)
            .map(score => ({
                sno: score.sno,
                cno: score.cno
            }));
        expect(actual).toEqual(expected);
    });

    it('查询‘3-105’号课程的平均分', () => {
        const expected = 81.5;

        const scoresOf3105 = scores.filter(score => score.cno === '3-105');
        const actual = Utils.average(scoresOf3105, 'degree');
        expect(actual).toEqual(expected);
    });

    it('查询Score中至少有5名学生选修的并以3开头的课程的平均分数', () => {
        const expected = [{ cno: '3-105', average: 81.5 }];

        const groupByCno = scores.reduce((accum, cur) => {
            accum[cur.cno] ? accum[cur.cno]++ : accum[cur.cno] = 1;
            return accum;
        }, {});

        let specifyCnos = [];
        for (let key in groupByCno) {
            if (groupByCno[key] >= 5 && key.startsWith('3')) {
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
        expect(actual).toEqual(expected);
    });

    it('查询最低分大于70，最高分小于90的Sno列', () => {
        const expected = [105, 108];

        const snoObj = scores.reduce((accum, cur) => {
            accum[cur.sno] ? accum[cur.sno].push(cur.degree) : accum[cur.sno] = [cur.degree];
            return accum;
        }, {});

        const actual = [];
        for (let sno in snoObj) {
            let maxDegree = Utils.caculateMax(snoObj[sno]);
            let minDegree = Utils.caculateMin(snoObj[sno]);
            if (maxDegree < 90 && minDegree > 70) {
                actual.push(Number(sno));
            }
        }

        expect(actual).toEqual(expected);
    });

    it('查询所有学生的Sname、Cno和Degree列', () => {
        const expected = [
            {cno: '3-105', degree: 78, sname: '曾华'},
            {cno: '6-166', degree: 81, sname: '曾华'},
            {cno: '3-245', degree: 75, sname: '匡明'},
            {cno: '3-105', degree: 88, sname: '匡明'},
            {cno: '3-105', degree: 91, sname: '王丽'},
            {cno: '6-106', degree: 79, sname: '王丽'},
            {cno: '3-105', degree: 64, sname: '李军'},
            {cno: '6-166', degree: 85, sname: '李军'},
            {cno: '3-245', degree: 68, sname: '王芳'},
            {cno: '3-105', degree: 76, sname: '王芳'},
            {cno: '3-245', degree: 86, sname: '陆君'},
            {cno: '3-105', degree: 92, sname: '陆君'}
        ];

        let actual = [];
        students.forEach(student => {
            let newScore = scores.filter(score => {
                if (score.sno === student.sno) {
                    delete score.sno;
                    score.sname = student.sname;
                    return score;
                }

            });
            actual.push(...newScore);
        });

        expect(actual).toEqual(expected);
    });

    it('查询所有学生的Sno、Cname和Degree列', () => {
        const expected = [];

        let actual = [];

        let queryCourseName = (cno) => {
            courses.find(course => {
                if (course.cno === cno) {
                    return course.cname;
                }
            });
        };

        students.forEach(student => {
            let newScore = scores.filter(score => {
                if (score.sno === student.sno) {
                    score.cname = queryCourseName(score.cno);
                    return score;
                }

            });
            actual.push(...newScore);
        });

        expect(actual).toEqual(expected);
    });

    it('查询所有学生的Sname、Cname和Degree列', () => {
        fail('unimplement');
    });

    it('查询“95033”班所选课程的平均分', () => {
        const expected = 80;

        const allStudens = students.filter(student => student.class === 95033);
        let classSumScore = 0;
        let classSumNum = 0;
        allStudens.forEach(student => {
            let oneStudentClass = scores.filter(score => score.sno === student.sno);
            let oneStudentSumScore = Utils.caculateSum(oneStudentClass, 'degree');
            classSumNum += oneStudentClass.length;
            classSumScore += oneStudentSumScore;
        });

        const actual = Math.round(classSumScore / classSumNum);

        expect(actual).toEqual(expected);
    });

    it('现查询所有同学的Sno、Cno和rank列', () => {
        fail('unimplement');
    });

    it('查询选修“3-105”课程的成绩高于“109”号同学成绩的所有同学的记录', () => {
        const expected = [
            { sno: 103, cno: '3-105', degree: 92 },
            { sno: 105, cno: '3-105', degree: 88 },
            { sno: 107, cno: '3-105', degree: 91 },
            { sno: 108, cno: '3-105', degree: 78 }
        ];

        let specifyClass = scores.filter(score => score.cno === '3-105');
        let speccifyScore = specifyClass.find(classItem => classItem.sno === 109).degree;
        let actual = specifyClass.filter(score => score.degree > speccifyScore);
        expect(actual).toEqual(expected);
    });

    it('查询score中选学一门以上课程的同学中分数为非最高分成绩的记录', () => {
        const expected = [
            { sno: 101, cno: '3-105', degree: 64 },
            { sno: 101, cno: '6-166', degree: 85 },
            { sno: 103, cno: '3-245', degree: 86 },
            { sno: 105, cno: '3-245', degree: 75 },
            { sno: 105, cno: '3-105', degree: 88 },
            { sno: 107, cno: '3-105', degree: 91 },
            { sno: 107, cno: '6-106', degree: 79 },
            { sno: 108, cno: '3-105', degree: 78 },
            { sno: 108, cno: '6-166', degree: 81 },
            { sno: 109, cno: '3-245', degree: 68 },
            { sno: 109, cno: '3-105', degree: 76 }
        ];

        let studentMap = Utils.caculateRepeateNum(scores, 'sno');
        let allRecords = [];
        for (let student in studentMap) {
            if (studentMap[student] > 1) {
                let records = scores.filter(score => score.sno == student);
                allRecords.push(...records);
            }
        }
        let allDegrees = allRecords.map(record => record.degree);
        let maxDegree = Utils.caculateMax(allDegrees);
        const actual = allRecords.filter(record => record.degree !== maxDegree);

        expect(actual).toEqual(expected);
    });

    it('查询成绩高于学号为“109”、课程号为“3-105”的成绩的所有记录', () => {
        const expected = [
            { sno: 103, cno: '3-245', degree: 86 },
            { sno: 103, cno: '3-105', degree: 92 },
            { sno: 105, cno: '3-105', degree: 88 },
            { sno: 107, cno: '3-105', degree: 91 },
            { sno: 108, cno: '3-105', degree: 78 },
            { sno: 101, cno: '6-166', degree: 85 },
            { sno: 107, cno: '6-106', degree: 79 },
            { sno: 108, cno: '6-166', degree: 81 }
        ];

        let specifyRecord = scores.find(score => score.sno === 109 && score.cno === '3-105');
        const actual = scores.filter(score => score.degree > specifyRecord.degree);
        expect(actual).toEqual(expected);
    });

    it('查询和学号为108的同学同年出生的所有学生的Sno、Sname和Sbirthday列', () => {
        fail('unimplement');
    });

    it('查询“张旭“教师任课的学生成绩', () => {
        fail('unimplement');
    });

    it('查询选修某课程的同学人数多于5人的教师姓名', () => {
        fail('unimplement');
    });

    it('查询95033班和95031班全体学生的记录', () => {
        fail('unimplement');
    });

    it('查询存在有85分以上成绩的课程Cno.', () => {
        fail('unimplement');
    });

    it('查询出“计算机系“教师所教课程的成绩', () => {
        fail('unimplement');
    });

    it('查询“计算机系”与“电子工程系“不同职称的教师的Tname和Prof', () => {
        fail('unimplement');
    });

    it('查询选修编号为“3-105“课程且成绩至少高于选修编号为“3-245”的同学的Cno、Sno和Degree,并按Degree从高到低次序排序', () => {
        fail('unimplement');
    });

    it('查询选修编号为“3-105”且成绩高于选修编号为“3-245”课程的同学的Cno、Sno和Degree.', () => {
        fail('unimplement');
    });

    it('查询所有教师和同学的name、sex和birthday.', () => {
        fail('unimplement');
    });

    it('查询所有“女”教师和“女”同学的name、sex和birthday.', () => {
        fail('unimplement');
    });

    it('查询成绩比该课程平均成绩低的同学的成绩', () => {
        fail('unimplement');
    });

    it('查询所有任课教师的Tname和Depart.', () => {
        fail('unimplement');
    });

    it('查询所有未讲课的教师的Tname和Depart.', () => {
        fail('unimplement');
    });

    it('查询至少有2名男生的班号', () => {
        fail('unimplement');
    });

    it('查询Student中不姓“王”的同学记录', () => {
        fail('unimplement');
    });

    it('查询Student中每个学生的姓名和年龄', () => {
        fail('unimplement');
    });

    it('查询Student中最大和最小的Sbirthday日期值', () => {
        fail('unimplement');
    });

    it('以班号和年龄从大到小的顺序查询Student中的全部记录', () => {
        fail('unimplement');
    });

    it('查询“男”教师及其所上的课程', () => {
        fail('unimplement');
    });

    it('查询最高分同学的Sno、Cno和Degree列', () => {
        fail('unimplement');
    });

    it('查询和“李军”同性别的所有同学的Sname.', () => {
        fail('unimplement');
    });

    it('查询和“李军”同性别并同班的同学Sname.', () => {
        fail('unimplement');
    });

    it('查询所有选修“计算机导论”课程的“男”同学的成绩', () => {
        fail('unimplement');
    });

});