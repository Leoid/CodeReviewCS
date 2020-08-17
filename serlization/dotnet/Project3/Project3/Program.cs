using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace Project3
{
    class Program
    {
        static void Main(string[] args)
        {

            // Create a User object
            var u1 = new User();
            u1.name = "b1twis3";

            Serializer(u1);
          
           
        }
        static void Serializer(Object obj)
        {
            // Create a XML Doc to add a custom element for the class type
            XmlDocument xmldoc = new XmlDocument();
            XmlElement xmlel = xmldoc.CreateElement("Class");
            xmldoc.AppendChild(xmlel);

            XmlElement xmlel1 = xmldoc.CreateElement("item");
            xmlel1.SetAttribute("role", obj.GetType().AssemblyQualifiedName);

            XmlDocument xmldoc2 = new XmlDocument();

            XmlSerializer x = new XmlSerializer(obj.GetType());
            StringWriter writer = new StringWriter();
            x.Serialize(writer, obj);
            xmldoc2.LoadXml(writer.ToString());
            xmlel1.AppendChild(xmldoc.ImportNode(xmldoc2.DocumentElement, true));
            xmlel.AppendChild(xmlel1);
            File.WriteAllText("output.txt", xmldoc.OuterXml);
          
        }
    }
    public class User
    {
        public string name;
        public String Name
        {
           
            get
            {
                return name;
            }
            set
            {
                name = value;
                Console.WriteLine("User Class");
                
            }

        }

    }
    public class Admin
    {
        public string name;
        
        public String Name
        {
            get
            {
                return name;
            }
            set
            {
                name = value;
                Console.WriteLine("Admin Class");
                //Func-------Demo5
            }
        }

        

    }
}
