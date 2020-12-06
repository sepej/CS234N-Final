using System.Collections.Generic;
using System.Linq;
using System;

using NUnit.Framework;
using BITSEFClasses.Models;
using Microsoft.EntityFrameworkCore;

namespace BITSEFTests
{
    [TestFixture]
    public class AppUsersTests
    {
        BITSEFContext dbContext;
        AppUser u;
        List<AppUser> users;

        [SetUp]
        public void Setup()
        {
            dbContext = new BITSEFContext();
            //dbContext.Database.ExecuteSqlRaw("call usp_testingResetData()");
        }

        [Test]
        public void GetAllTest()
        {
            u = new AppUser();
            u.Name = "Joseph";
            dbContext.AppUser.Add(u);

            AppUser u2 = new AppUser();
            u2.Name = "Mari";
            dbContext.AppUser.Add(u2);
            dbContext.SaveChanges();

            users = dbContext.AppUser.OrderBy(u => u.AppUserId).ToList();
            Assert.AreEqual(2, users.Count);
            Assert.AreEqual("Mari", users[1].Name);
            PrintAll(users);
        }

        [Test]
        public void GetByPrimaryKeyTest()
        {
            u = dbContext.AppUser.Find(2);
            Assert.IsNotNull(u);
            Assert.AreEqual("Joseph", u.Name);
            Console.WriteLine(u);
        }

        [Test]
        public void GetUsingWhere()
        {
            users = dbContext.AppUser.Where(u => u.Name.StartsWith("J")).OrderBy(u => u.Name).ToList();
            Assert.AreEqual(1, users.Count);
            Assert.AreEqual("Joseph", users[0].Name);
            PrintAll(users);
        }

        [Test]
        public void CreateTest()
        {
            u = new AppUser();
            u.Name = "Mari";
            dbContext.AppUser.Add(u);
            dbContext.SaveChanges();
            Assert.IsNotNull(dbContext.AppUser.Find(1));
        }

        [Test]
        public void UpdateTest()
        {
            u = dbContext.AppUser.Find(2);
            u.Name = "Edited Name";
            dbContext.AppUser.Update(u);
            dbContext.SaveChanges();
            u = dbContext.AppUser.Find(2);
            Assert.AreEqual("Edited Name", u.Name);
        }

        [Test]
        public void DeleteTest()
        {
            u = dbContext.AppUser.Find(1);
            dbContext.AppUser.Remove(u);
            dbContext.SaveChanges();
            Assert.IsNull(dbContext.AppUser.Find(1));
        }

        public void PrintAll(List<AppUser> users)
        {
            foreach (AppUser u in users)
            {
                Console.WriteLine(u);
            }
        }
    }
}