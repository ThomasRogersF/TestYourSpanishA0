
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { QuizAdminProps, QuizQuestion } from "@/types/quiz";

const AdminPanel = ({ config, onConfigUpdate }: QuizAdminProps) => {
  const [currentTab, setCurrentTab] = useState("general");
  const [webhookUrl, setWebhookUrl] = useState(config.webhookUrl);
  const [title, setTitle] = useState(config.title);
  const [description, setDescription] = useState(config.description || "");
  const [logoUrl, setLogoUrl] = useState(config.logoUrl || "");
  
  // Basic save functionality for demonstration
  const handleSave = () => {
    onConfigUpdate({
      ...config,
      title,
      description,
      logoUrl,
      webhookUrl
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quiz Admin Panel</h1>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="results">Results Templates</TabsTrigger>
          <TabsTrigger value="incentive">Incentive</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Quiz Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
              />
              {logoUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="h-10 w-auto"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook">Webhook URL</Label>
              <Input
                id="webhook"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://example.com/webhook"
              />
              <p className="text-xs text-gray-500">
                Quiz responses will be sent to this URL as JSON data.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="questions">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              In this tab, you would be able to add, edit, and remove quiz questions. 
              For this demo, we're showing a basic question list.
            </p>
            
            <div className="border rounded-md">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-medium">Questions List</h3>
              </div>
              <ul className="divide-y">
                {config.questions.map((question: QuizQuestion, index: number) => (
                  <li key={question.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span>
                        <span className="font-medium">Q{index + 1}:</span> {question.title}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {question.type}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="results">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Here you would manage the personalized result templates that are shown based on user responses.
            </p>
            
            <div className="border rounded-md">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-medium">Result Templates</h3>
              </div>
              <ul className="divide-y">
                {config.resultTemplates.map((template) => (
                  <li key={template.id} className="p-4 hover:bg-gray-50">
                    <div className="font-medium">{template.title}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {template.description.substring(0, 100)}...
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="incentive">
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <input 
                type="checkbox" 
                id="enable-incentive" 
                checked={config.incentiveEnabled}
                onChange={() => {
                  onConfigUpdate({
                    ...config,
                    incentiveEnabled: !config.incentiveEnabled
                  });
                }}
                className="mr-2"
              />
              <Label htmlFor="enable-incentive">
                Enable incentive on completion
              </Label>
            </div>
            
            {config.incentiveEnabled && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="incentive-title">Incentive Title</Label>
                  <Input
                    id="incentive-title"
                    value={config.incentiveTitle || ""}
                    onChange={(e) => {
                      onConfigUpdate({
                        ...config,
                        incentiveTitle: e.target.value
                      });
                    }}
                    placeholder="e.g., Free Learning Guide PDF"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="incentive-url">Resource URL</Label>
                  <Input
                    id="incentive-url"
                    value={config.incentiveUrl || ""}
                    onChange={(e) => {
                      onConfigUpdate({
                        ...config,
                        incentiveUrl: e.target.value
                      });
                    }}
                    placeholder="https://example.com/download.pdf"
                  />
                </div>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} className="quiz-button">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;
