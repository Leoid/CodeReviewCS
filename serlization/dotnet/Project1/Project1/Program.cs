using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Project1
{
    class Program
    {
        static void Main(string[] args)
        {
            //Create a DummyClass object
            DummyClass dc = new DummyClass();
            dc.name = "b1twis3";

            Serializer(dc);

        }

        static void Serializer(DummyClass dc)
        {
            XmlSerializer x = new XmlSerializer(typeof(DummyClass));
            TextWriter writer = new StreamWriter("output.txt");
            x.Serialize(writer, dc);
            writer.Close();
        }
    }

    public class DummyClass
    {
        public String name { get; set; }
        
    }
}
