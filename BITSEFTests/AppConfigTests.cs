using System.Collections.Generic;
using System.Linq;
using System;

using NUnit.Framework;
using BITSEFClasses.Models;
using Microsoft.EntityFrameworkCore;

namespace AppConfigTests
{
    [TestFixture]
    public class ProductTests
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

        
        public void PrintAll(List<AppConfig> configs)
        {
            foreach (AppConfig c in configs)
            {
                Console.WriteLine(c);
            }
        }
    }
}