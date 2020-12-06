using System.Collections.Generic;
using System.Linq;
using System;

using NUnit.Framework;
using BITSEFClasses.Models;
using Microsoft.EntityFrameworkCore;

namespace BITSEFTests
{
    [TestFixture]
    public class AppConfigTests
    {
        BITSEFContext dbContext;
        AppConfig c;
        List<AppConfig> configs;

        [SetUp]
        public void Setup()
        {
            dbContext = new BITSEFContext();
            //dbContext.Database.ExecuteSqlRaw("call usp_testingResetData()");
        }

        [Test]
        public void GetAllTest()
        {
            configs = dbContext.AppConfig.OrderBy(c => c.BreweryId).ToList();
            Assert.AreEqual(1, configs.Count);
            Assert.AreEqual("Manifest", configs[0].BreweryName);
            PrintAll(configs);
        }

        [Test]
        public void GetByPrimaryKeyTest()
        {
            c = dbContext.AppConfig.Find(1);
            Assert.IsNotNull(c);
            Assert.AreEqual(1, c.BreweryId);
            Console.WriteLine(c);
        }

        [Test]
        public void CreateTest()
        {
            c = new AppConfig();
            c.BreweryId = 2;
            c.DefaultUnits = "imperial";
            c.BreweryName = "Joseph's Brewery";
            c.HomePageText = "Home page text";
            c.BreweryLogo = "logo.jpg";
            c.HomePageBackgroundImage = "background.jpg";
            c.Color1 = "8d81db";
            c.Color2 = "57c7cf";
            c.Color3 = "387047";
            c.ColorWhite = "ffffff";
            c.ColorBlack = "000000";
            dbContext.AppConfig.Add(c);
            dbContext.SaveChanges();
            AppConfig c2 = new AppConfig();
            c2 = dbContext.AppConfig.Where(c => c.BreweryName == "Joseph's Brewery").SingleOrDefault();
            Assert.AreEqual(c, c2);
        }

        [Test]
        public void UpdateTest()
        {
            c = dbContext.AppConfig.Find(1);
            c.BreweryName = "Edited Brewery";
            dbContext.AppConfig.Update(c);
            dbContext.SaveChanges();
            c = dbContext.AppConfig.Find(1);
            Assert.AreEqual("Edited Brewery", c.BreweryName);
        }

        [Test]
        public void DeleteTest()
        {
            c = new AppConfig();
            c.BreweryId = 30;
            c.DefaultUnits = "imperial";
            c.BreweryName = "Joseph's Brewery";
            c.HomePageText = "Home page text";
            c.BreweryLogo = "logo.jpg";
            c.HomePageBackgroundImage = "background.jpg";
            c.Color1 = "8d81db";
            c.Color2 = "57c7cf";
            c.Color3 = "387047";
            c.ColorWhite = "ffffff";
            c.ColorBlack = "000000";
            dbContext.AppConfig.Add(c);
            dbContext.SaveChanges();

            AppConfig c2 = dbContext.AppConfig.Single(c => c.BreweryId == 30);
            dbContext.AppConfig.Remove(c2);
            dbContext.SaveChanges();
            Assert.IsNull(dbContext.AppConfig.Where(p => p.BreweryId == 30).SingleOrDefault());
        }

        public void PrintAll(List<AppConfig> configs)
        {
            foreach (AppConfig c in configs)
            {
                Console.WriteLine(c);
            }
        }
    }
}