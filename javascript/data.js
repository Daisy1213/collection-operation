const students = [
    { sno: 108, sname: '曾华', ssex: '男', sbirthday: "1999-09-01", class: 95033 },
    { sno: 105, sname: '匡明', ssex: '男', sbirthday: "1975-10-02", class: 95031 },
    { sno: 107, sname: '王丽', ssex: '女', sbirthday: "1976-01-23", class: 95033 },
    { sno: 101, sname: '李军', ssex: '男', sbirthday: "1976-02-20", class: 95033 },
    { sno: 109, sname: '王芳', ssex: '女', sbirthday: "1975-02-10", class: 95031 },
    { sno: 103, sname: '陆君', ssex: '男', sbirthday: "1974-06-03", class: 95031 }];

const courses = [
    { cno: '3-105', cname: '计算机导论', tno: 825 },
    { cno: '3-245', cname: '操作系统', tno: 804 },
    { cno: '6-166', cname: '数据电路', tno: 856 },
    { cno: '9-888', cname: '高等数学', tno: 100 }];

const scores = [
    { sno: 103, cno: '3-245', degree: 86 }, 
    { sno: 105, cno: '3-245', degree: 75 },
    { sno: 109, cno: '3-245', degree: 68 },
    { sno: 103, cno: '3-105', degree: 92 },
    { sno: 105, cno: '3-105', degree: 88 },
    { sno: 109, cno: '3-105', degree: 76 },
    { sno: 101, cno: '3-105', degree: 64 },
    { sno: 107, cno: '3-105', degree: 91 },
    { sno: 108, cno: '3-105', degree: 78 },
    { sno: 101, cno: '6-166', degree: 85 },
    { sno: 107, cno: '6-106', degree: 79 },
    { sno: 108, cno: '6-166', degree: 81 }];

const teachers = [
    { tno: 804, tname: '李诚', tsex: '男', tbirthday: '1958-12-02', prof: '副教授', depart: '计算机系' },
    { tno: 856, tname: '张旭', tsex: '男', tbirthday: '1969-03-12', prof: '讲师', depart: '电子工程系' },
    { tno: 825, tname: '王萍', tsex: '女', tbirthday: '1972-05-05', prof: '助教', depart: '计算机系' },
    { tno: 831, tname: '刘冰', tsex: '女', tbirthday: '1977-08-14', prof: '助教', depart: '电子工程系' }];

module.exports = {
    students,
    courses,
    scores,
    teachers
}