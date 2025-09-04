import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuickActions() {
    return (
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-5 flex flex-col justify-center h-full">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Quick Action</h3>
                <div className="space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Withdraw Funds Now</Button>
                    <Button variant="outline" className="w-full bg-white">View Payout Schedule</Button>
                </div>
            </CardContent>
        </Card>
    );
}